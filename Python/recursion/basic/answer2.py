from typing import List

def tower_of_hanoi(n: int, source: str, target: str, auxiliary: str) -> List[str]:
    """
    Solve the Tower of Hanoi problem and return the list of moves.

    Args:
        n (int): Number of disks.
        source (str): The source rod.
        target (str): The target rod.
        auxiliary (str): The auxiliary rod.

    Returns:
        List[str]: List of moves as strings.
    """
    moves: List[str] = []
    def solve(n: int, source: str, target: str, auxiliary: str) -> None:
        if n == 1:
            moves.append(f"Move disk 1 from rod {source} to rod {target}")
            return
        solve(n - 1, source, auxiliary, target)
        moves.append(f"Move disk {n} from rod {source} to rod {target}")
        solve(n - 1, auxiliary, target, source)
    solve(n, source, target, auxiliary)
    return moves

if __name__ == "__main__":
    n = 2
    result = tower_of_hanoi(n, 'A', 'C', 'B')
    for move in result:
        print(move) 