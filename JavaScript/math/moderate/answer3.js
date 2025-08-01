// Integer to Roman

/**
 * Approach 1: Greedy algorithm with predefined values
 * Time Complexity: O(1) - at most 13 iterations
 * Space Complexity: O(1)
 */
const intToRomanGreedy = (num) => {
  // Define the mapping of values to Roman numerals in descending order
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  let result = '';
  
  // Process each value from largest to smallest
  for (let i = 0; i < values.length; i++) {
    // Add the numeral as many times as the value fits into num
    while (num >= values[i]) {
      result += numerals[i];
      num -= values[i];
    }
  }
  
  return result;
};

/**
 * Approach 2: Direct mapping with arrays
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
const intToRomanDirect = (num) => {
  // Define arrays for each digit place
  const thousands = ["", "M", "MM", "MMM"];
  const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  
  // Extract each digit and map to Roman numeral
  return thousands[Math.floor(num / 1000)] + 
         hundreds[Math.floor((num % 1000) / 100)] + 
         tens[Math.floor((num % 100) / 10)] + 
         ones[num % 10];
};

/**
 * Approach 3: Functional approach using array methods
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
const intToRomanFunctional = (num) => {
  const romanMap = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];
  
  return romanMap.reduce((result, { value, numeral }) => {
    const count = Math.floor(num / value);
    num %= value;
    return result + numeral.repeat(count);
  }, '');
};

/**
 * Approach 4: Using Map for value-numeral pairs
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
const intToRomanMap = (num) => {
  const romanMap = new Map([
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ]);
  
  let result = '';
  
  for (const [value, numeral] of romanMap) {
    const count = Math.floor(num / value);
    if (count > 0) {
      result += numeral.repeat(count);
      num %= value;
    }
  }
  
  return result;
};

/**
 * Approach 5: Recursive approach
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
const intToRomanRecursive = (num, index = 0) => {
  // Define the mapping of values to Roman numerals
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  // Base case
  if (num === 0) return '';
  
  // If current value fits into num, use it
  if (num >= values[index]) {
    return numerals[index] + intToRomanRecursive(num - values[index], index);
  }
  
  // Otherwise, move to the next value
  return intToRomanRecursive(num, index + 1);
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function* intToRomanGenerator(num) {
  yield { step: 'initial', num };
  
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  
  let result = '';
  
  yield { step: 'start_conversion', num, result };
  
  for (let i = 0; i < values.length; i++) {
    const count = Math.floor(num / values[i]);
    yield { step: 'processing', value: values[i], numeral: numerals[i], count, remaining: num };
    
    if (count > 0) {
      const numeralsToAdd = numerals[i].repeat(count);
      result += numeralsToAdd;
      num -= values[i] * count;
      yield { step: 'updated', result, remaining: num };
    }
    
    if (num === 0) break;
  }
  
  yield { step: 'result', result };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Integer to Roman ===');
  
  const testCases = [3749, 58, 1994, 3, 4, 9, 58, 994, 1000, 2000];
  
  testCases.forEach((testCase) => {
    console.log(`\nTesting num = ${testCase}`);
    
    const result1 = intToRomanGreedy(testCase);
    console.log(`Greedy approach: ${result1}`);
    
    const result2 = intToRomanDirect(testCase);
    console.log(`Direct mapping approach: ${result2}`);
    
    const result3 = intToRomanFunctional(testCase);
    console.log(`Functional approach: ${result3}`);
    
    const result4 = intToRomanMap(testCase);
    console.log(`Map approach: ${result4}`);
    
    const result5 = intToRomanRecursive(testCase);
    console.log(`Recursive approach: ${result5}`);
    
    // Generator approach
    console.log('Generator approach:');
    const generator = intToRomanGenerator(testCase);
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
  const performanceTest = (func, num, name) => {
    const start = performance.now();
    func(num);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testValue = 1994;
  
  performanceTest(intToRomanGreedy, testValue, 'Greedy approach');
  performanceTest(intToRomanDirect, testValue, 'Direct mapping approach');
  performanceTest(intToRomanFunctional, testValue, 'Functional approach');
  performanceTest(intToRomanMap, testValue, 'Map approach');
  performanceTest(intToRomanRecursive, testValue, 'Recursive approach');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    intToRomanGreedy,
    intToRomanDirect,
    intToRomanFunctional,
    intToRomanMap,
    intToRomanRecursive,
    intToRomanGenerator
  };
}
