import random

all_names = [
    "Noah", "Raya", "Nathan", "Gwen", "Kristy",
    "James", "Madison", "Dylan", "Carter", 
    "Grandma"
]

display_names = [
    "Grandma",
    "James", "Madison", "Dylan", "Carter", 
    "Kristy", "Noah", "Raya", "Nathan", "Gwen"
]

LAST_YEAR_PAIRS = {
    # "Giver": "LastYearGiftee"
    "Noah": "",
    "Raya": "",
    "Nathan" : "",
    "Gwen" : "",
    "Kristy" : "",
    "Madison" : "",
    "Dylan" : "",
    "Carter": "",
    "James": "",
    "Grandma" : "",

}

def generate_pairs(names, last_year_pairs, extra_forbidden):

    if extra_forbidden is None:
        extra_forbidden = {}

    while True:  # keep trying until we find a valid assignment
        remaining = names[:]          # recipients still available
        random.shuffle(remaining)     # randomize recipient order
        pairs = {}
        success = True

        # You can also sort 'names' by number of constraints if things ever get tight
        for giver in names:
            forbidden = set()
            forbidden.add(giver)  # can't get yourself

            # can't get last year's person
            if giver in last_year_pairs:
                forbidden.add(last_year_pairs[giver])

            # any extra forbidden people (e.g., same household)
            forbidden |= set(extra_forbidden.get(giver, []))

            # valid choices from what's left
            candidates = [r for r in remaining if r not in forbidden]

            if not candidates:
                # dead end → restart whole assignment
                success = False
                break

            recipient = random.choice(candidates)
            pairs[giver] = recipient
            remaining.remove(recipient)

        if success and len(pairs) == len(names):
            return pairs

def main():
    EXTRA_FORBIDDEN = {
        # Kirsty Family
        "Noah": {"Raya"},
        "Raya": {"Noah"},
        "Nathan": {""},
        "Gwen": {""},
        "Kristy": {"Noah", "Raya", "Nathan", "Gwen",  "Kristy"},
        
        #James Family
        "James" : {"Madison", "Dylan", "Carter", "Tristen"},
        "Madison" : {"Dylan"},
        "Dylan" : {"Madison"},
        "Carter" : {"Tristen"},
        #"Tristen" : {"Carter"},

        #Grandma
        "Grandma" : {""},

    }

    pairs = generate_pairs(all_names, LAST_YEAR_PAIRS, EXTRA_FORBIDDEN)

    # Write out in your desired display order
    with open("names.txt", "w") as f:
        for giver in display_names:
            giftee = pairs[giver]
            f.write(f"{giver} --> {giftee}\n")

    print("Secret Santa pairs have been written to 'names.txt'.")


if __name__ == "__main__":
    main()
    
