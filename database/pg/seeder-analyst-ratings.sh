#!/bin/bash

for i in {1..10}
do
  echo "analyst-ratings-$i"
  pv -W /media/storage/desmo/projects/hr/Robinhood-AnalystRatings/database/sample_data/analysts-ratings-$i.txt | psql robinhood_db_test -c "COPY analyst_ratings FROM STDIN;"
done
