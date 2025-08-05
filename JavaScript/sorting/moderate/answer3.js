/**
 * Maximum Number of Visible Points
 * 
 * Problem: You are given an array points, an integer angle, and your location, 
 * where location = [posx, posy] and points[i] = [xi, yi] both denote integral 
 * coordinates on the X-Y plane. You are given an angle in degrees, representing 
 * your field of view. You can see some set of points if they are at most angle 
 * degrees apart in your field of view.
 * 
 * Approach 1: Calculate Angles and Use Sliding Window
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function visiblePoints(points, angle, location) {
    const [x, y] = location;
    let same = 0;
    const angles = [];
    
    // Calculate angles relative to the location
    for (const [px, py] of points) {
        // Count points at the same location as the observer
        if (px === x && py === y) {
            same++;
            continue;
        }
        
        // Calculate angle in degrees (0 to 360)
        const angleRad = Math.atan2(py - y, px - x);
        let angleDeg = angleRad * 180 / Math.PI;
        if (angleDeg < 0) angleDeg += 360;
        
        angles.push(angleDeg);
    }
    
    // Sort the angles
    angles.sort((a, b) => a - b);
    
    // Duplicate the array to handle circular nature (angles near 360 and 0)
    const doubledAngles = [...angles, ...angles.map(a => a + 360)];
    
    let max = 0;
    let left = 0;
    
    // Use sliding window to find the maximum number of points within the angle
    for (let right = 0; right < doubledAngles.length; right++) {
        while (doubledAngles[right] - doubledAngles[left] > angle + 1e-9) {
            left++;
        }
        max = Math.max(max, right - left + 1);
        
        // Early exit if all points are already included
        if (max === points.length) break;
    }
    
    return max + same;
}

/**
 * Approach 2: Binary Search for Each Point
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function visiblePointsBinarySearch(points, angle, location) {
    const [x, y] = location;
    const angles = [];
    let same = 0;
    
    // Calculate angles and count points at the same location
    for (const [px, py] of points) {
        if (px === x && py === y) {
            same++;
            continue;
        }
        
        const angleRad = Math.atan2(py - y, px - x);
        let angleDeg = angleRad * 180 / Math.PI;
        if (angleDeg < 0) angleDeg += 360;
        
        angles.push(angleDeg);
    }
    
    angles.sort((a, b) => a - b);
    
    // For circular handling, add 360 to each angle and append
    const extendedAngles = [...angles, ...angles.map(a => a + 360)];
    
    let max = 0;
    
    // For each point, find the rightmost point within the angle using binary search
    for (let i = 0; i < angles.length; i++) {
        const target = angles[i] + angle;
        const idx = binarySearch(extendedAngles, target);
        const count = Math.min(idx - i, angles.length);
        max = Math.max(max, count);
    }
    
    return max + same;
}

function binarySearch(angles, target) {
    let left = 0;
    let right = angles.length;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (angles[mid] <= target + 1e-9) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

/**
 * Approach 3: Using Polar Coordinates and Sliding Window
 * Optimized version with angle normalization
 */
function visiblePointsOptimized(points, angle, location) {
    const [x, y] = location;
    const angles = [];
    let same = 0;
    
    // Calculate angles and count points at the same location
    for (const [px, py] of points) {
        const dx = px - x;
        const dy = py - y;
        
        if (dx === 0 && dy === 0) {
            same++;
            continue;
        }
        
        // Calculate angle in degrees and normalize to [0, 360)
        const angleRad = Math.atan2(dy, dx);
        let angleDeg = angleRad * 180 / Math.PI;
        if (angleDeg < 0) angleDeg += 360;
        
        angles.push(angleDeg);
    }
    
    // Sort angles for sliding window
    angles.sort((a, b) => a - b);
    
    // For circular handling, add 360 to each angle and append
    const extendedAngles = [...angles, ...angles.map(a => a + 360)];
    
    let max = 0;
    let left = 0;
    
    // Sliding window to find maximum points within the angle
    for (let right = 0; right < extendedAngles.length; right++) {
        while (extendedAngles[right] - extendedAngles[left] > angle + 1e-9) {
            left++;
        }
        max = Math.max(max, right - left + 1);
        
        // Early exit if we've already found all points
        if (max === angles.length) break;
    }
    
    return max + same;
}

// Test cases
function runTests() {
    const testCases = [
        {
            points: [[2,1],[2,2],[3,3]],
            angle: 90,
            location: [1,1],
            expected: 3,
            name: 'Example 1'
        },
        {
            points: [[2,1],[2,2],[3,4],[1,1]],
            angle: 90,
            location: [1,1],
            expected: 4,
            name: 'Example 2'
        },
        {
            points: [[1,0],[2,1]],
            angle: 13,
            location: [1,1],
            expected: 1,
            name: 'Example 3'
        },
        {
            points: [[1,1],[2,2],[3,3],[4,4],[1,2],[2,1]],
            angle: 0,
            location: [1,1],
            expected: 1,
            name: 'Zero angle'
        },
        {
            points: [[0,0],[0,2]],
            angle: 90,
            location: [1,1],
            expected: 2,
            name: 'Simple case'
        },
        {
            points: [[1,1],[1,1],[1,1]],
            angle: 1,
            location: [1,1],
            expected: 3,
            name: 'All points at the same location'
        },
        {
            points: [[2,1],[2,-1],[-2,-1],[-2,1]],
            angle: 90,
            location: [0,0],
            expected: 2,
            name: 'Points in all quadrants'
        }
    ];
    
    const functions = [
        { name: 'Sliding Window', fn: visiblePoints },
        { name: 'Binary Search', fn: visiblePointsBinarySearch },
        { name: 'Optimized', fn: visiblePointsOptimized }
    ];
    
    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name}:`);
        let allPassed = true;
        let testResults = [];
        
        testCases.forEach((test, i) => {
            // Create a deep copy of the points array to avoid modifying the original
            const pointsCopy = test.points.map(p => [...p]);
            const locationCopy = [...test.location];
            
            const result = fn(pointsCopy, test.angle, locationCopy);
            const passed = result === test.expected;
            
            if (!passed) allPassed = false;
            
            testResults.push({
                name: test.name,
                passed,
                result,
                expected: test.expected,
                input: {
                    points: test.points,
                    angle: test.angle,
                    location: test.location
                }
            });
            
            console.log(`  Test ${i + 1} (${test.name}): ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Expected: ${test.expected}`);
                console.log(`    Got: ${result}`);
                console.log(`    Input: points=${JSON.stringify(test.points)}, ` +
                           `angle=${test.angle}, location=${JSON.stringify(test.location)}`);
            }
        });
        
        // Log detailed test results
        console.log(`\nDetailed Test Results for ${name}:`);
        testResults.forEach((test, i) => {
            console.log(`  ${i + 1}. ${test.name}: ${test.passed ? '✅' : '❌'}`);
            if (!test.passed) {
                console.log(`     Input: points=${JSON.stringify(test.input.points)}`);
                console.log(`            angle=${test.input.angle}, location=${JSON.stringify(test.input.location)}`);
                console.log(`     Expected: ${test.expected}, Got: ${test.result}`);
            }
        });
        
        console.log(`\n  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Maximum Number of Visible Points ===');
runTests();

// Export functions for use in other modules
module.exports = {
    visiblePoints,
    visiblePointsBinarySearch,
    visiblePointsOptimized
};
