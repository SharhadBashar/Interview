'''
Write a computePolkadotScore function that counts the number of polkadots on the dress within the following ascii art of Angelica.

Polkadots whose x coordinate is >= the x coordinate of the character that starts Angelica's lips and <= the x coordinate of the character that ends her lips are counted in a special way: multiply the sum of the polkadots in that range by the number of characters used to represent her pupils.

The final score could be computed with this formula:

Num Polkadots Outside the Lips Range + (Num Polkadots Inside the Lips Range) * (Num Chars Used to Represent Angelica's Pupils)
There are no ', `, , or - characters in her lips or pupils.
'''

def computePolkadotScore(art: str) -> int:
    """
    Score =
        (# of 'O' outside lips x-range)
        + (# of 'O' inside lips x-range) * (# of characters used to draw the pupils)

    - Polkadots are 'O'
    - Lips are the first occurrence of "()" (start is '(', end is ')', inclusive)
    - Pupils are detected as the first pattern on any line like:  X ; X
      where X is the same non-space character on both sides of ';' and X is not in {"'", "`", ",", "-"}.
      The number of characters used to represent her pupils is counted as the contiguous run-length
      of X immediately left of ';' plus the contiguous run-length immediately right of ';'.
    """
    lines = art.splitlines()

    # 1) Find lips range ("()")
    lips_start = lips_end = None
    for line in lines:
        idx = line.find("()")
        if idx != -1:
            lips_start = idx       # '('
            lips_end = idx + 1     # ')', inclusive
            break
    if lips_start is None:
        raise ValueError('Could not locate lips: expected substring "()" in the ASCII art.')

    # 2) Find pupils and count how many characters are used to represent them
    forbidden = {"'", "`", ",", "-"}
    pupils_chars_used = None

    for line in lines:
        for i, ch in enumerate(line):
            if ch != ";":
                continue

            # nearest non-space char to the left of ';'
            l = i - 1
            while l >= 0 and line[l] == " ":
                l -= 1

            # nearest non-space char to the right of ';'
            r = i + 1
            while r < len(line) and line[r] == " ":
                r += 1

            if l < 0 or r >= len(line):
                continue

            left_char = line[l]
            right_char = line[r]

            if left_char != right_char:
                continue
            if left_char == " " or left_char in forbidden:
                continue

            # contiguous run length of the pupil char on the left side
            l0 = l
            while l0 - 1 >= 0 and line[l0 - 1] == left_char:
                l0 -= 1
            left_run = l - l0 + 1

            # contiguous run length of the pupil char on the right side
            r0 = r
            while r0 + 1 < len(line) and line[r0 + 1] == right_char:
                r0 += 1
            right_run = r0 - r + 1

            pupils_chars_used = left_run + right_run
            break

        if pupils_chars_used is not None:
            break

    if pupils_chars_used is None:
        raise ValueError("Could not locate pupils: expected an X ; X eyes pattern in the ASCII art.")

    # 3) Count polkadots inside vs outside lips x-range
    inside = 0
    outside = 0
    for line in lines:
        for x, ch in enumerate(line):
            if ch != "O":
                continue
            if lips_start <= x <= lips_end:
                inside += 1
            else:
                outside += 1

    return outside + inside * pupils_chars_used

art = '''
              ,   ,-',
        ,', ,'  ','  ,'   ÅÑGË£ÏÇÄ †(–)Ë ßRÄ†
      '-',  '      ,'
          ' -,    ',
              ' -, ',                                         , - - -,
             ('''''' ®'''''''')                        ,,,,,    ,-' -,''''''''',
              ` ~„''`„~ '                          ',  ,', -' , -,'' ''''''''',
                  "„  " - „                   „ - ",®,-'     `~~' '''''''
                 „"         " „         „ - "      ,',,,',
               „-" " " " " " " ~~~~~~" - „       ,'
            „" –,'' ~ ,       • ; •          "      "„
            """";      ' - , ,  ; , , , - '' ' ' -,_ ', ',
           , -' ' ',           ,'    ,'             ',~', ',
         ,'         ' - , ,()' /\    ',          (),'¯ ,'   `¸`;
         ',                            ` ` ` ` ` `      ,-,,,-'
           '-,                                  ,¬  ,-'
              ' -, ~            ~~~~~~' ' ` ,-'
                  `~-,,,,,,,      ,,,,,,,,,,-~'
      ('('('(,,,              ;    ;                •Å(V)åö•
       '-, '-,'''      ,-';`,`'ˆˆˆˆˆ ,' ;' ' -,           •97•
         ;¯ ;      ;  ;  ', ; ; ,'  ;  ‚¸  ' -,        •••
         ;   ;     ;       '''''''''''    ``'-,',  ,'
         ;   ;, -¬;    O   O      O   '-',,,,,,,,,,,,
         ;        ;  O   O     O O    O  ,'     O     ,'
          ' - - ' `;    O        O  O    O   O    ,'
               ,-'   O    O    O  O      O    O   ,'
            ,-' O O  O   O        O        O ,'
         ,-'   O      O   O   O     O  O     ,'
      ,-'  O    O    O  O   O   O O O   O,-'-,
       ``¬ -,,,,,,,-¬~,~~~~~~~~~--',)  (' -,
                    ',   (',                     ' -,    '-,
                     ',)  (',                        `-,)  ' -,
                      ',    ',                           `-,  ,',-----,
                       ',)   ;                              `\,- ---'
                   ¸,,,,'‡  (;
                  (¸,,,,,';_'\ ßy §(V)òó†(–)775 ™
'''
print(computePolkadotScore(art))
