// Max Points on a Line

/**
 * Approach 1: HashMap to count slopes
 * Time Complexity: O(n^2) where n is the number of points
 * Space Complexity: O(n) for the hashmap
 */
const maxPointsHashMap = (points) => {
  if (points.length <= 2) return points.length;
  
  let maxPoints = 0;
  
  // For each point, calculate the slope with all other points
  for (let i = 0; i < points.length; i++) {
    const map = new Map();
    let samePoint = 1;  // Count the point itself
    let localMax = 0;
    
    for (let j = i + 1; j < points.length; j++) {
      let dx = points[j][0] - points[i][0];
      let dy = points[j][1] - points[i][1];
      
      // Handle same points
      if (dx === 0 && dy === 0) {
        samePoint++;
        continue;
      }
      
      // Reduce the fraction to its simplest form
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const g = gcd(dx, dy);
      dx /= g;
      dy /= g;
      
      // Normalize the slope representation
      if (dx < 0) {
        dx = -dx;
        dy = -dy;
      } else if (dx === 0) {
        dy = Math.abs(dy);
      }
      
      // Create a key for the slope
      const key = `${dy}/${dx}`;
      
      // Update the count for this slope
      map.set(key, (map.get(key) || 0) + 1);
      localMax = Math.max(localMax, map.get(key));
    }
    
    // Update the global maximum
    maxPoints = Math.max(maxPoints, localMax + samePoint);
  }
  
  return maxPoints;
};

/**
 * Approach 2: Object-based approach
 * Time Complexity: O(n^2) where n is the number of points
 * Space Complexity: O(n) for the object
 */
const maxPointsObject = (points) => {
  if (points.length <= 2) return points.length;
  
  let maxPoints = 0;
  
  // For each point, calculate the slope with all other points
  for (let i = 0; i < points.length; i++) {
    const slopes = {};
    let samePoint = 1;  // Count the point itself
    let localMax = 0;
    
    for (let j = i + 1; j < points.length; j++) {
      let dx = points[j][0] - points[i][0];
      let dy = points[j][1] - points[i][1];
      
      // Handle same points
      if (dx === 0 && dy === 0) {
        samePoint++;
        continue;
      }
      
      // Reduce the fraction to its simplest form
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const g = gcd(dx, dy);
      dx /= g;
      dy /= g;
      
      // Normalize the slope representation
      if (dx < 0) {
        dx = -dx;
        dy = -dy;
      } else if (dx === 0) {
        dy = Math.abs(dy);
      }
      
      // Create a key for the slope
      const key = `${dy}/${dx}`;
      
      // Update the count for this slope
      slopes[key] = (slopes[key] || 0) + 1;
      localMax = Math.max(localMax, slopes[key]);
    }
    
    // Update the global maximum
    maxPoints = Math.max(maxPoints, localMax + samePoint);
  }
  
  return maxPoints;
};

/**
 * Approach 3: Functional approach using array methods
 * Time Complexity: O(n^2) where n is the number of points
 * Space Complexity: O(n) for the map
 */
const maxPointsFunctional = (points) => {
  if (points.length <= 2) return points.length;
  
  // Helper function to calculate GCD
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  
  // For each point, calculate max points on a line
  return points.reduce((max, point, i) => {
    const map = new Map();
    let samePoint = 1;
    
    // Calculate slopes with all subsequent points
    points.slice(i + 1).forEach((otherPoint) => {
      let dx = otherPoint[0] - point[0];
      let dy = otherPoint[1] - point[1];
      
      // Handle same points
      if (dx === 0 && dy === 0) {
        samePoint++;
        return;
      }
      
      // Reduce fraction
      const g = gcd(dx, dy);
      dx /= g;
      dy /= g;
      
      // Normalize
      if (dx < 0) {
        dx = -dx;
        dy = -dy;
      } else if (dx === 0) {
        dy = Math.abs(dy);
      }
      
      // Update map
      const key = `${dy}/${dx}`;
      map.set(key, (map.get(key) || 0) + 1);
    });
    
    // Find maximum points on a line through this point
    const localMax = Math.max(...map.values(), 0);
    return Math.max(max, localMax + samePoint);
  }, 0);
};

/**
 * Approach 4: Using Map with custom key generation
 * Time Complexity: O(n^2) where n is the number of points
 * Space Complexity: O(n) for the map
 */
const maxPointsCustomKey = (points) => {
  if (points.length <= 2) return points.length;
  
  // Helper function to generate slope key
  const generateKey = (dx, dy) => {
    if (dx === 0 && dy === 0) return 'same';
    if (dx === 0) return 'vertical';
    if (dy === 0) return 'horizontal';
    
    // Reduce fraction
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const g = gcd(Math.abs(dx), Math.abs(dy));
    let reducedDx = dx / g;
    let reducedDy = dy / g;
    
    // Normalize
    if (reducedDx < 0) {
      reducedDx = -reducedDx;
      reducedDy = -reducedDy;
    }
    
    return `${reducedDy}/${reducedDx}`;
  };
  
  let maxPoints = 0;
  
  for (let i = 0; i < points.length; i++) {
    const map = new Map();
    let samePoint = 0;
    
    for (let j = 0; j < points.length; j++) {
      if (i === j) {
        samePoint++;
        continue;
      }
      
      const dx = points[j][0] - points[i][0];
      const dy = points[j][1] - points[i][1];
      const key = generateKey(dx, dy);
      
      map.set(key, (map.get(key) || 0) + 1);
    }
    
    // Find maximum points on a line through this point
    const localMax = Math.max(...map.values(), 0);
    maxPoints = Math.max(maxPoints, localMax + samePoint);
  }
  
  return maxPoints;
};

/**
 * Approach 5: Using BigInt for precise slope calculation
 * Time Complexity: O(n^2) where n is the number of points
 * Space Complexity: O(n) for the map
 */
const maxPointsBigInt = (points) => {
  if (points.length <= 2) return points.length;
  
  let maxPoints = 0;
  
  for (let i = 0; i < points.length; i++) {
    const map = new Map();
    let samePoint = 1;
    
    for (let j = i + 1; j < points.length; j++) {
      let dx = BigInt(points[j][0] - points[i][0]);
      let dy = BigInt(points[j][1] - points[i][1]);
      
      // Handle same points
      if (dx === 0n && dy === 0n) {
        samePoint++;
        continue;
      }
      
      // Reduce the fraction to its simplest form
      const gcd = (a, b) => b === 0n ? a : gcd(b, a % b);
      const g = gcd(dx, dy);
      dx /= g;
      dy /= g;
      
      // Normalize the slope representation
      if (dx < 0n) {
        dx = -dx;
        dy = -dy;
      } else if (dx === 0n) {
        dy = dy < 0n ? -dy : dy;
      }
      
      // Create a key for the slope
      const key = `${dy}/${dx}`;
      
      // Update the count for this slope
      map.set(key, (map.get(key) || 0) + 1);
    }
    
    // Find maximum points on a line through this point
    const localMax = Math.max(...map.values(), 0);
    maxPoints = Math.max(maxPoints, localMax + samePoint);
  }
  
  return maxPoints;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n^2) where n is the number of points
 * Space Complexity: O(n) for the map
 */
function* maxPointsGenerator(points) {
  yield { step: 'initial', points };
  
  if (points.length <= 2) {
    yield { step: 'result', maxPoints: points.length };
    return points.length;
  }
  
  let maxPoints = 0;
  
  // For each point, calculate the slope with all other points
  for (let i = 0; i < points.length; i++) {
    yield { step: 'processing_point', index: i, point: points[i] };
    
    const map = new Map();
    let samePoint = 1;
    let localMax = 0;
    
    for (let j = i + 1; j < points.length; j++) {
      yield { step: 'comparing_points', point1: points[i], point2: points[j] };
      
      let dx = points[j][0] - points[i][0];
      let dy = points[j][1] - points[i][1];
      
      // Handle same points
      if (dx === 0 && dy === 0) {
        samePoint++;
        yield { step: 'same_point', count: samePoint };
        continue;
      }
      
      // Reduce the fraction to its simplest form
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const g = gcd(dx, dy);
      dx /= g;
      dy /= g;
      
      yield { step: 'reduced_fraction', dx, dy };
      
      // Normalize the slope representation
      if (dx < 0) {
        dx = -dx;
        dy = -dy;
      } else if (dx === 0) {
        dy = Math.abs(dy);
      }
      
      // Create a key for the slope
      const key = `${dy}/${dx}`;
      
      // Update the count for this slope
      map.set(key, (map.get(key) || 0) + 1);
      localMax = Math.max(localMax, map.get(key));
      
      yield { step: 'updated_slope_count', key, count: map.get(key), localMax };
    }
    
    // Update the global maximum
    const totalPoints = localMax + samePoint;
    maxPoints = Math.max(maxPoints, totalPoints);
    
    yield { step: 'updated_max_points', throughPoint: points[i], localMax: totalPoints, globalMax: maxPoints };
  }
  
  yield { step: 'result', maxPoints };
  return maxPoints;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Max Points on a Line ===');
  
  const testCases = [
    [[1,1],[2,2],[3,3]],
    [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]],
    [[0,0],[1,1],[0,0]],
    [[1,1],[1,1],[1,1]],
    [[0,0],[1,1],[2,2],[3,3]],
    [[1,1],[2,2],[3,3],[0,0],[4,4]],
    [[0,0],[1,1],[0,0],[0,1],[0,0]]
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTesting case ${index + 1}:`, JSON.stringify(testCase));
    
    const result1 = maxPointsHashMap(testCase);
    console.log(`HashMap approach: ${result1}`);
    
    const result2 = maxPointsObject(testCase);
    console.log(`Object approach: ${result2}`);
    
    const result3 = maxPointsFunctional(testCase);
    console.log(`Functional approach: ${result3}`);
    
    const result4 = maxPointsCustomKey(testCase);
    console.log(`Custom key approach: ${result4}`);
    
    const result5 = maxPointsBigInt(testCase);
    console.log(`BigInt approach: ${result5}`);
    
    // Generator approach
    console.log('Generator approach:');
    const generator = maxPointsGenerator(testCase);
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
  const performanceTest = (func, points, name) => {
    const start = performance.now();
    func(points);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testPoints = Array.from({ length: 100 }, (_, i) => [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100)
  ]);
  
  performanceTest(maxPointsHashMap, testPoints, 'HashMap approach');
  performanceTest(maxPointsObject, testPoints, 'Object approach');
  performanceTest(maxPointsFunctional, testPoints, 'Functional approach');
  performanceTest(maxPointsCustomKey, testPoints, 'Custom key approach');
  performanceTest(maxPointsBigInt, testPoints, 'BigInt approach');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    maxPointsHashMap,
    maxPointsObject,
    maxPointsFunctional,
    maxPointsCustomKey,
    maxPointsBigInt,
    maxPointsGenerator
  };
}
