from typing import List


def calculate(s: str) -> int:
    """Evaluate a string expression using a stack-based approach.
    
    Handles:
    - Parentheses
    - Addition and subtraction
    - Positive and negative numbers
    - Spaces
    
    Args:
        s (str): The expression string to evaluate
        
    Returns:
        int: Result of the evaluation
    """
    stack: List[int] = []  # Stack to store intermediate results
    num = 0  # Current number being processed
    sign = 1  # 1 for positive, -1 for negative
    result = 0  # Running result
    
    for char in s:
        # Process digit
        if char.isdigit():
            num = num * 10 + int(char)
            
        # Process operators and parentheses
        elif char in '+-(':
            # Add previous number to result
            result += sign * num
            num = 0
            
            if char == '+':
                sign = 1
            elif char == '-':
                sign = -1
            else:  # char == '('
                # Push current result and sign onto stack
                stack.append(result)
                stack.append(sign)
                # Reset result and sign for expression inside parentheses
                result = 0
                sign = 1
                
        elif char == ')':
            # Add last number inside parentheses
            result += sign * num
            num = 0
            
            # Multiply result by sign from stack
            result *= stack.pop()
            # Add to previous result from stack
            result += stack.pop()
    
    # Add final number if exists
    result += sign * num
    
    return result


def test_calculator() -> None:
    """Test the calculator implementation with example cases."""
    # Test case 1: "1 + 1"
    expr1 = "1 + 1"
    print(f"Test case 1: {expr1}")
    print(f"Expected: 2")
    print(f"Got: {calculate(expr1)}\n")
    
    # Test case 2: " 2-1 + 2 "
    expr2 = " 2-1 + 2 "
    print(f"Test case 2: {expr2}")
    print(f"Expected: 3")
    print(f"Got: {calculate(expr2)}\n")
    
    # Test case 3: "(1+(4+5+2)-3)+(6+8)"
    expr3 = "(1+(4+5+2)-3)+(6+8)"
    print(f"Test case 3: {expr3}")
    print(f"Expected: 23")
    print(f"Got: {calculate(expr3)}\n")
    
    # Test case 4: "2147483647"
    expr4 = "2147483647"
    print(f"Test case 4: {expr4}")
    print(f"Expected: 2147483647")
    print(f"Got: {calculate(expr4)}")


if __name__ == "__main__":
    test_calculator() 