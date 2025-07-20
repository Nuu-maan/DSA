def totalNQueens(n: int) -> int:
    """
    Return the number of distinct solutions to the n-queens puzzle.

    Args:
        n (int): The size of the chessboard and number of queens.

    Returns:
        int: Number of distinct solutions.
    """
    def backtrack(row: int, cols: set, diag1: set, diag2: set) -> int:
        if row == n:
            return 1
        count = 0
        for col in range(n):
            if col in cols or (row - col) in diag1 or (row + col) in diag2:
                continue
            count += backtrack(row + 1, cols | {col}, diag1 | {row - col}, diag2 | {row + col})
        return count
    return backtrack(0, set(), set(), set())

if __name__ == "__main__":
    n = 4
    print(totalNQueens(n))  # Output: 2 