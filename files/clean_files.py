import sys

# --- UTILS ---

# Splits lines up, adds NULL values and strips letters from id
def get_line_attributes(line):
    line = [l.strip().replace('\N', 'NULL') for l in line.split('\t')]
    line[0] = line[0].replace('tt', '11')
    return line


def get_line(file, is_first=False):
    line = file.readline()
    if is_first and line:
        line = file.readline()

    return line if line else None

# --- UTILS ---

def create_series_file():
    with open('title.basics.tsv') as in_file, open('series.csv', 'w') as out_file:
        out_file.write('id,title,start_year,end_year\n')

        for line in in_file:
            if 'tvSeries' not in line:
                continue

            attributes = get_line_attributes(line)

            row = [attributes[0], '"' + str(attributes[2]) + '"', attributes[5], attributes[6]]

            out_file.write(','.join(row) + '\n')

def create_episodes_file():
    with open('title.basics.tsv') as basics, open('title.episode.tsv') as episodes, open('title.ratings.tsv') as ratings:
        with open('episodes.csv', 'w') as out_file:
            out_file.write('id,series_id,season_number,episode_number,rating,number_of_votes\n')
            
            basics_line = get_line(basics, is_first=True)
            episodes_line = get_line(episodes, is_first=True)
            ratings_line = get_line(ratings, is_first=True)

            basics_attributes = episodes_attributes = ratings_attributes = None
            while basics_line and episodes_line and ratings_line:
                basics_attributes = basics_attributes or get_line_attributes(basics_line)
                episodes_attributes = episodes_attributes or get_line_attributes(episodes_line)
                ratings_attributes = ratings_attributes or get_line_attributes(ratings_line)
                basics_id = int(basics_attributes[0])
                episodes_id = int(episodes_attributes[0])
                ratings_id = int(ratings_attributes[0])

                if 'tvEpisode' != basics_attributes[1] or basics_id < episodes_id or basics_id < ratings_id:
                    basics_line = basics.readline()
                    basics_attributes = None
                    continue

                if ratings_id < basics_id or ratings_id < episodes_id:
                    ratings_line = ratings.readline()
                    ratings_attributes = None
                    continue

                if episodes_id < basics_id or episodes_id < ratings_id:
                    episodes_line = episodes.readline()
                    episodes_attributes = None
                    continue

                # All ids are equal, write to file and increment
                row = [
                    episodes_attributes[0],
                    episodes_attributes[1].replace('tt', '11'),
                    episodes_attributes[2],
                    episodes_attributes[3],
                    ratings_attributes[1],
                    ratings_attributes[2]
                ]

                out_file.write(', '.join(row) + '\n')

                basics_line = get_line(basics)
                episodes_line = get_line(episodes)
                ratings_line = get_line(ratings)

                basics_attributes = episodes_attributes = ratings_attributes = None

if __name__ == '__main__':
    create_series_file()
    create_episodes_file()


