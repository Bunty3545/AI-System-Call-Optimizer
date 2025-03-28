import sys
import json
import random
from collections import Counter

def analyze_syscalls(file_path):
    with open(file_path, "r") as file:
        syscalls = file.read().strip().split("\n")
    
    call_counts = Counter(syscalls)
    execution_times = {call: round(random.uniform(0.1, 2.0), 3) for call in call_counts.keys()}  # Dummy execution times

    response = {
        "message": "Analysis Complete!",
        "calls": list(call_counts.keys()),
        "counts": list(call_counts.values()),
        "times": [execution_times[call] for call in call_counts.keys()]
    }
    
    print(json.dumps(response))

if __name__ == "__main__":
    analyze_syscalls(sys.argv[1])
