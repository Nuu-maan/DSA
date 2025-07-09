from collections import deque

def predictPartyVictory(senate: str) -> str:
    """
    LeetCode 649: Dota2 Senate
    Simulate the round-based voting and return the winning party.
    """
    n = len(senate)
    radiant = deque()
    dire = deque()
    for i, s in enumerate(senate):
        if s == 'R':
            radiant.append(i)
        else:
            dire.append(i)
    while radiant and dire:
        r = radiant.popleft()
        d = dire.popleft()
        if r < d:
            radiant.append(r + n)
        else:
            dire.append(d + n)
    return "Radiant" if radiant else "Dire"

if __name__ == "__main__":
    print(predictPartyVictory("RD"))   # Output: Radiant
    print(predictPartyVictory("RDD"))  # Output: Dire 