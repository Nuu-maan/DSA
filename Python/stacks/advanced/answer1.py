from typing import Dict, List
from collections import defaultdict
from dataclasses import dataclass, field


@dataclass
class FreqStack:
    """A stack that pops the most frequent element.
    
    If there is a tie for the most frequent element, returns the most recently added.
    Uses a combination of hash maps and stacks to achieve O(1) time complexity for all operations.
    
    Attributes:
        freq_map (Dict[int, int]): Maps value to its frequency
        group_map (Dict[int, List[int]]): Maps frequency to list of values with that frequency
        max_freq (int): Current maximum frequency
    """
    
    freq_map: Dict[int, int] = field(default_factory=dict)
    group_map: Dict[int, List[int]] = field(default_factory=lambda: defaultdict(list))
    max_freq: int = field(default=0)
    
    def push(self, val: int) -> None:
        """Push a value onto the stack.
        
        Updates frequency map and group map, and tracks maximum frequency.
        
        Args:
            val (int): Value to push
        """
        # Update frequency of val
        freq = self.freq_map.get(val, 0) + 1
        self.freq_map[val] = freq
        
        # Add val to its frequency group
        self.group_map[freq].append(val)
        
        # Update maximum frequency
        self.max_freq = max(self.max_freq, freq)
    
    def pop(self) -> int:
        """Remove and return the most frequent element.
        
        If there's a tie, returns the most recently added element.
        
        Returns:
            int: The most frequent element
        """
        # Get the most recent value from highest frequency group
        val = self.group_map[self.max_freq].pop()
        
        # Update frequency map
        self.freq_map[val] -= 1
        if self.freq_map[val] == 0:
            del self.freq_map[val]
        
        # Update max_freq if current group becomes empty
        if not self.group_map[self.max_freq]:
            self.max_freq -= 1
        
        return val


def test_freq_stack() -> None:
    """Test the FreqStack implementation with example cases."""
    # Test case from problem description
    freqStack = FreqStack()
    operations = ["push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
    values = [5, 7, 5, 7, 4, 5, None, None, None, None]
    expected = [None, None, None, None, None, None, 5, 7, 5, 4]
    
    print("Test case from problem description:")
    for i, (op, val, exp) in enumerate(zip(operations, values, expected)):
        if op == "push":
            print(f"push({val})")
            freqStack.push(val)
        else:
            result = freqStack.pop()
            print(f"pop() = {result}")
            assert result == exp, f"Expected {exp}, but got {result}"
    
    # Additional test case
    print("\nAdditional test case:")
    freqStack = FreqStack()
    # Create scenario with multiple ties
    nums = [1, 2, 1, 2, 3, 1]
    for num in nums:
        print(f"push({num})")
        freqStack.push(num)
    
    # Pop should return most frequent elements (1s), then next frequent (2s)
    for _ in range(3):
        result = freqStack.pop()
        print(f"pop() = {result}")


if __name__ == "__main__":
    test_freq_stack() 