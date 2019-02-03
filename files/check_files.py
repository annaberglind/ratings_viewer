from sets import Set

def get_unique_series_from_series():
    series = Set()
    with open('series.csv') as in_file:
        for line in in_file:
            series.add(line.split(',')[0])

    print len(series)

def get_unique_series_from_episodes():
    series = Set()
    with open('episodes.csv') as in_file:
        for line in in_file:
            series.add(line.split(',')[1])

    print len(series)

# Add only episodes in series
def create_new_episodes_file():
    series = Set()
    with open('episodes.csv') as episodes_file, open('series.csv') as series_file, open('episodes_clean.csv', 'w') as out_file:
        for line in series_file:
            series.add(line.split(',')[0])

        i = 0
        for line in episodes_file:
            if i == 0:
                out_file.write(line)
                i += 1
                continue
            s = line.split(',')[1]
            if s in series:
                out_file.write(line)

    print len(series)

def check_episodes_not_in_series():
    series = Set()
    with open('episodes.csv') as episodes_file, open('series.csv') as series_file:
        for line in series_file:
            series.add(line.split(',')[0])

        for line in episodes_file:
            s = line.split(',')[1]
            if s not in series:
                print s

# print get_unique_series_from_series()
# print get_unique_series_from_episodes()
check_episodes_not_in_series()
# create_new_episodes_file()