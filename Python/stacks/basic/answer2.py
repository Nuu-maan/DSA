from typing import Dict, List


def get_precedence(operator: str) -> int:
    """Return the precedence value of an operator.
    
    Args:
        operator (str): The operator character
        
    Returns:
        int: Precedence value (higher means higher precedence)
    """
    precedence: Dict[str, int] = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    }
    return precedence.get(operator, 0)


def infix_to_postfix(expression: str) -> str:
    """Convert infix expression to postfix notation.
    
    Args:
        expression (str): The infix expression to convert
        
    Returns:
        str: The equivalent postfix expression
    """
    result: List[str] = []
    stack: List[str] = []
    
    for char in expression:
        # If character is operand, add it to output
        if char.isalnum():
            result.append(char)
            
        # If character is '(', push it to stack
        elif char == '(':
            stack.append(char)
            
        # If character is ')', pop all operators until '('
        elif char == ')':
            while stack and stack[-1] != '(':
                result.append(stack.pop())
            if stack:  # Remove '('
                stack.pop()
                
        # If character is operator
        else:
            # Pop operators with higher/equal precedence
            while (stack and stack[-1] != '(' and 
                   get_precedence(stack[-1]) >= get_precedence(char)):
                result.append(stack.pop())
            stack.append(char)
    
    # Pop remaining operators
    while stack:
        if stack[-1] != '(':
            result.append(stack.pop())
        else:
            stack.pop()
    
    return ''.join(result)


def process_test_cases() -> None:
    """Process multiple test cases of infix to postfix conversion."""
    T = int(input().strip())
    
    for _ in range(T):
        expression = input().strip()
        postfix = infix_to_postfix(expression)
        print(postfix)


if __name__ == "__main__":
    process_test_cases() 