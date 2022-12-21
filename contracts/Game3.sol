//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Game3 {
  uint8 y = 210;

  event Winner(address winner);

  function win(uint8 x) public {
    unchecked {
        uint8 sum = x + y;
        require(sum == 255, "Incorrect argument passed in!");
    }
    emit Winner(msg.sender);
  }
}