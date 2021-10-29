// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Dtwitter {
  uint public tweetCount = 0;
  mapping(uint => Tweet) public tweets;

  struct Tweet {
    uint id;
    string content;
    address author;
  }

  event TweetCreated(
    uint id,
    string content,
    address author
  );

  function tweet(string memory _content) public {
    require(bytes(_content).length > 0);
    require(bytes(_content).length < 140);
    require(msg.sender!=address(0));

    tweetCount++;

    tweets[tweetCount] = Tweet(tweetCount, _content, msg.sender);
    emit TweetCreated(tweetCount, _content, msg.sender);
  }
}
