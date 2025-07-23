from typing import List, Dict, Tuple
from dataclasses import dataclass


@dataclass
class Calculator:
    """A calculator that evaluates complex mathematical expressions.
    
    Uses recursive descent parsing and two stacks to handle operator precedence
    and nested parentheses. Supports +, -, *, /, and parentheses.
    """
    
    def calculate(self, s: str) -> int:
        """Evaluate a mathematical expression.
        
        Args:
            s (str): The expression string to evaluate
            
        Returns:
            int: Result of the evaluation
        """
        # Remove spaces and get clean expression
        s = s.replace(" ", "")
        if not s:
            return 0
        
        # Process expression using recursive descent
        result, _ = self._evaluate_expr(s, 0)
        return result
    
    def _evaluate_expr(self, s: str, i: int) -> Tuple[int, int]:
        """Recursively evaluate an expression starting at index i.
        
        Args:
            s (str): The expression string
            i (int): Current position in string
            
        Returns:
            Tuple[int, int]: (result, next_position)
        """
        nums: List[int] = []  # Stack for numbers
        ops: List[str] = []   # Stack for operators
        num = 0
        
        while i < len(s):
            char = s[i]
            
            if char.isdigit():
                # Build multi-digit number
                num = num * 10 + int(char)
                i += 1
                
            elif char in '+-*/':
                # Push previous number
                nums.append(num)
                num = 0
                
                # Process higher precedence operators
                while ops and self._has_precedence(ops[-1], char):
                    self._apply_operator(nums, ops)
                
                ops.append(char)
                i += 1
                
            elif char == '(':
                # Recursively evaluate expression in parentheses
                inner_result, next_pos = self._evaluate_expr(s, i + 1)
                nums.append(inner_result)
                i = next_pos
                
            elif char == ')':
                # Push final number and process remaining operators
                nums.append(num)
                while ops:
                    self._apply_operator(nums, ops)
                return nums[-1], i + 1
            
        # Push final number and process remaining operators
        nums.append(num)
        while ops:
            self._apply_operator(nums, ops)
        
        return nums[-1], i
    
    def _has_precedence(self, op1: str, op2: str) -> bool:
        """Check if op1 has higher or equal precedence than op2.
        
        Args:
            op1 (str): First operator
            op2 (str): Second operator
            
        Returns:
            bool: True if op1 has higher or equal precedence
        """
        if op1 in '*/' and op2 in '+-':
            return True
        if op1 in '*/' and op2 in '*/':
            return True
        if op1 in '+-' and op2 in '+-':
            return True
        return False
    
    def _apply_operator(self, nums: List[int], ops: List[str]) -> None:
        """Apply the top operator to the top two numbers.
        
        Args:
            nums (List[int]): Stack of numbers
            ops (List[str]): Stack of operators
        """
        op = ops.pop()
        b = nums.pop()
        a = nums.pop()
        
        if op == '+':
            nums.append(a + b)
        elif op == '-':
            nums.append(a - b)
        elif op == '*':
            nums.append(a * b)
        elif op == '/':
            # Integer division truncating toward zero
            nums.append(int(a / b))


def test_calculator() -> None:
    """Test the calculator implementation with example cases."""
    calc = Calculator()
    test_cases = [
        "1+1",
        "6-4/2",
        "2*(5+5*2)/3+(6/2+8)",
        "(2+6*3+5-(3*14/7+2)*5)+3",
        "0"
    ]
    expected = [2, 4, 21, -12, 0]
    
    for expr, exp in zip(test_cases, expected):
        result = calc.calculate(expr)
        print(f'Expression: "{expr}"')
        print(f"Expected: {exp}")
        print(f"Got: {result}")
        assert result == exp
        print()


if __name__ == "__main__":
    test_calculator() 