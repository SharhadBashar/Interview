import typing as t
import sys

Value = t.Union[str, int]
VALID_INT_CHARS = "0123456789"
SPECIAL_CHARS = ",()"


# You may need to modify this function for it to work properly
def consumeNextToken(s: str) -> t.Tuple[Value, str]:
    if s == "": # end of string base case
        return None, None
    if s in SPECIAL_CHARS: # these are tokens we want to parse but don't hold values
        return None, s[1:]
    elif s[0] == '"':  # parse a string
        for i, c in enumerate(s[1:]):
            if c == '"':
                return s[1:i+1], s[i+2:]
    elif s[0] in VALID_INT_CHARS:  # parse an integer
        for i, c in enumerate(s):
            if c not in VALID_INT_CHARS:
                return int(s[:i]), s[i+1:]
        return int(s), ""
    else: # parse a function name
        for i, c in enumerate(s):
            if c == "(":
                return s[: i], s[i+1:]

    raise ValueError(f"Unknown character: {s[0]} in {s}")


def main():
    # YOUR CODE HERE
    # READ INPUT FROM STDIN, THERE WILL ONLY BE ONE LINE OF INPUT WITH ONE EXPRESSION
    # PRINT RESULT TO STDOUT
    
    # FOR VECTORS YOU CAN TO STRING YOUR VECTOR RESULT AND THEN USE str.replace(' ', '') TO REMOVE THE SPACES
    ...

main()