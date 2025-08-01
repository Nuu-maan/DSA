// Basic Calculator

/**
 * Approach 1: Stack-based solution
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(n) for the stack
 */
const calculateStack = (s) => {
  let result = 0;
  let number = 0;
  let sign = 1;  // 1 for positive, -1 for negative
  const stack = [];
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    if (char >= '0' && char <= '9') {
      // Build the number
      number = number * 10 + parseInt(char);
    } else if (char === '+') {
      // Add the previous number to result
      result += sign * number;
      number = 0;
      sign = 1;
    } else if (char === '-') {
      // Add the previous number to result
      result += sign * number;
      number = 0;
      sign = -1;
    } else if (char === '(') {
      // Push the current result and sign to stack
      stack.push(result);
      stack.push(sign);
      // Reset result and sign for the new sub-expression
      result = 0;
      sign = 1;
    } else if (char === ')') {
      // Add the last number to result
      result += sign * number;
      number = 0;
      // Pop the sign and previous result from stack
      result *= stack.pop();  // sign
      result += stack.pop();  // previous result
    }
    // Skip spaces
  }
  
  // Add the last number
  result += sign * number;
  
  return result;
};

/**
 * Approach 2: Recursive descent parser
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(n) for the recursion stack
 */
const calculateRecursive = (s) => {
  // Remove all spaces
  s = s.replace(/\s/g, '');
  
  // Helper function to parse expression
  const parseExpr = (index) => {
    let result = 0;
    let sign = 1;
    
    while (index < s.length && s[index] !== ')') {
      if (s[index] >= '0' && s[index] <= '9') {
        // Parse number
        let num = 0;
        while (index < s.length && s[index] >= '0' && s[index] <= '9') {
          num = num * 10 + parseInt(s[index]);
          index++;
        }
        result += sign * num;
      } else if (s[index] === '+') {
        sign = 1;
        index++;
      } else if (s[index] === '-') {
        sign = -1;
        index++;
      } else if (s[index] === '(') {
        // Parse sub-expression
        const [subResult, newIndex] = parseExpr(index + 1);
        result += sign * subResult;
        index = newIndex + 1;  // Skip the ')'
      } else {
        index++;
      }
    }
    
    return [result, index];
  };
  
  return parseExpr(0)[0];
};

/**
 * Approach 3: Functional approach with array methods
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(n) for the stack
 */
const calculateFunctional = (s) => {
  // Remove spaces and convert to array
  const chars = s.replace(/\s/g, '').split('');
  
  // Process using reduce
  const process = (acc, char) => {
    const { result, number, sign, stack } = acc;
    
    if (char >= '0' && char <= '9') {
      return { ...acc, number: number * 10 + parseInt(char) };
    } else if (char === '+') {
      return { 
        result: result + sign * number, 
        number: 0, 
        sign: 1, 
        stack 
      };
    } else if (char === '-') {
      return { 
        result: result + sign * number, 
        number: 0, 
        sign: -1, 
        stack 
      };
    } else if (char === '(') {
      return { 
        result: 0, 
        number: 0, 
        sign: 1, 
        stack: [...stack, result, sign] 
      };
    } else if (char === ')') {
      const prevSign = stack.pop();
      const prevResult = stack.pop();
      return { 
        result: (result + sign * number) * prevSign + prevResult, 
        number: 0, 
        sign: 1, 
        stack 
      };
    }
    
    return acc;
  };
  
  // Initial state
  const initialState = { result: 0, number: 0, sign: 1, stack: [] };
  
  // Process all characters
  const finalState = chars.reduce(process, initialState);
  
  // Add the last number
  return finalState.result + finalState.sign * finalState.number;
};

/**
 * Approach 4: Using Map for state management
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(n) for the stack
 */
const calculateMap = (s) => {
  const state = new Map([
    ['result', 0],
    ['number', 0],
    ['sign', 1],
    ['stack', []]
  ]);
  
  // Remove spaces
  s = s.replace(/\s/g, '');
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    if (char >= '0' && char <= '9') {
      state.set('number', state.get('number') * 10 + parseInt(char));
    } else if (char === '+') {
      state.set('result', state.get('result') + state.get('sign') * state.get('number'));
      state.set('number', 0);
      state.set('sign', 1);
    } else if (char === '-') {
      state.set('result', state.get('result') + state.get('sign') * state.get('number'));
      state.set('number', 0);
      state.set('sign', -1);
    } else if (char === '(') {
      const stack = state.get('stack');
      stack.push(state.get('result'));
      stack.push(state.get('sign'));
      state.set('stack', stack);
      state.set('result', 0);
      state.set('sign', 1);
    } else if (char === ')') {
      state.set('result', state.get('result') + state.get('sign') * state.get('number'));
      state.set('number', 0);
      const stack = state.get('stack');
      const sign = stack.pop();
      const prevResult = stack.pop();
      state.set('result', state.get('result') * sign + prevResult);
    }
  }
  
  // Add the last number
  return state.get('result') + state.get('sign') * state.get('number');
};

/**
 * Approach 5: Using BigInt for very large numbers
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(n) for the stack
 */
const calculateBigInt = (s) => {
  let result = 0n;
  let number = 0n;
  let sign = 1n;
  const stack = [];
  
  // Remove spaces
  s = s.replace(/\s/g, '');
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    if (char >= '0' && char <= '9') {
      number = number * 10n + BigInt(char);
    } else if (char === '+') {
      result += sign * number;
      number = 0n;
      sign = 1n;
    } else if (char === '-') {
      result += sign * number;
      number = 0n;
      sign = -1n;
    } else if (char === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0n;
      sign = 1n;
    } else if (char === ')') {
      result += sign * number;
      number = 0n;
      result *= stack.pop();
      result += stack.pop();
    }
  }
  
  // Add the last number
  result += sign * number;
  
  return Number(result);
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(n) for the stack
 */
function* calculateGenerator(s) {
  yield { step: 'initial', expression: s };
  
  let result = 0;
  let number = 0;
  let sign = 1;
  const stack = [];
  
  yield { step: 'start_processing', result, number, sign };
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    yield { step: 'processing_char', index: i, char };
    
    if (char >= '0' && char <= '9') {
      number = number * 10 + parseInt(char);
      yield { step: 'building_number', number };
    } else if (char === '+') {
      result += sign * number;
      number = 0;
      sign = 1;
      yield { step: 'add_operation', result, number, sign };
    } else if (char === '-') {
      result += sign * number;
      number = 0;
      sign = -1;
      yield { step: 'subtract_operation', result, number, sign };
    } else if (char === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
      yield { step: 'open_parenthesis', stack, result, sign };
    } else if (char === ')') {
      result += sign * number;
      number = 0;
      const prevSign = stack.pop();
      const prevResult = stack.pop();
      result = result * prevSign + prevResult;
      yield { step: 'close_parenthesis', result, stack };
    }
  }
  
  // Add the last number
  result += sign * number;
  yield { step: 'final_result', result };
  
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Basic Calculator ===');
  
  const testCases = [
    "1 + 1",
    " 2-1 + 2 ",
    "(1+(4+5+2)-3)+(6+8)",
    "-1 + 2",
    "-(1 + 2)",
    "1-(5)",
    "2-(5-6)",
    "(1+(4+5+2)-3)+(6+8)-(10)"
  ];
  
  testCases.forEach((testCase) => {
    console.log(`\nTesting expression: "${testCase}"`);
    
    const result1 = calculateStack(testCase);
    console.log(`Stack approach: ${result1}`);
    
    const result2 = calculateRecursive(testCase);
    console.log(`Recursive approach: ${result2}`);
    
    const result3 = calculateFunctional(testCase);
    console.log(`Functional approach: ${result3}`);
    
    const result4 = calculateMap(testCase);
    console.log(`Map approach: ${result4}`);
    
    const result5 = calculateBigInt(testCase);
    console.log(`BigInt approach: ${result5}`);
    
    // Generator approach
    console.log('Generator approach:');
    const generator = calculateGenerator(testCase);
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log(`  ${JSON.stringify(result.value)}`);
      }
    } while (!result.done);
    console.log(`  Final result: ${result.value}`);
  });
  
  // Performance comparison utility
  const performanceTest = (func, s, name) => {
    const start = performance.now();
    func(s);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testExpression = "(1+(4+5+2)-3)+(6+8)-(10)+(15-3)+(7+9)-(2+4)";
  
  performanceTest(calculateStack, testExpression, 'Stack approach');
  performanceTest(calculateRecursive, testExpression, 'Recursive approach');
  performanceTest(calculateFunctional, testExpression, 'Functional approach');
  performanceTest(calculateMap, testExpression, 'Map approach');
  performanceTest(calculateBigInt, testExpression, 'BigInt approach');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateStack,
    calculateRecursive,
    calculateFunctional,
    calculateMap,
    calculateBigInt,
    calculateGenerator
  };
}
