import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { Web3Context } from "../contexts/web3";
import Dtwitter from "../abis/Dtwitter.json";

const Main = () => {
  const { selectedAccount } = useContext(Web3Context);
  const [dtwitter, setDtwitter] = useState();
  const [tweetCount, setTweetCount] = useState(0);
  const [tweets, setTweets] = useState([]);
  const [tweetContent, setTweetContent] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await getTweets();
    })();
  }, []);

  const getTweets = async () => {
    if (window.ethereum) {
      setLoading(true);
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const networkData = Dtwitter.networks[networkId];

      if (networkData) {
        const contract = new web3.eth.Contract(
          Dtwitter.abi,
          networkData.address
        );
        setDtwitter(contract);
        const _tweetCount = await contract.methods.tweetCount().call();
        setTweetCount(_tweetCount);
        // Load tweets
        for (var i = 1; i <= _tweetCount; i++) {
          const _tweet = await contract.methods.tweets(i).call();
          console.log(_tweet);
          setTweets((prevTweets) => [...prevTweets, _tweet]);
        }
        console.log(tweets);
        setLoading(false);
      } else {
        window.alert("dTwitter contract not deployed to detected network.");
      }
    } else {
      alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const tweet = async (content) => {
    if (window.ethereum) {
      await dtwitter.methods.tweet(content).send({ from: selectedAccount });
    }
  };

  return loading ? (
    <div className="text-center mt-5">
      <span class="spinner-border text-center" role="status">
        <span class="visually-hidden">Loading...</span>
      </span>
    </div>
  ) : (
    <div className="container-fluid mt-4" style={{ maxWidth: "40rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          tweet(tweetContent);
        }}
      >
        <textarea
          className="form-control"
          placeholder="What's happening?"
          onChange={(e) => setTweetContent(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-2" type="submit">
          Tweet
        </button>
      </form>
      <div>
        {tweets.map((tweet) => (
          <div className="card mt-4" id={tweet.id}>
            <div className="card-body">
              <small className="text-muted">{tweet.author}</small>
              <p className="card-text mt-2">{tweet.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
