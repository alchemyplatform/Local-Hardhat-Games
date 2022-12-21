//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Game1 {
  event Winner(address winner);

  function win() public {
    emit Winner(msg.sender);
  }
}