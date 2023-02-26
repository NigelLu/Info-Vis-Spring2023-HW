This dataset is updated from Citi Bike trip data: https://www.citibikenyc.com/system-data.

It has the following columns:
- station: the name of the Citi Bike stations
- latitude: the latitudes of the stations
- longitude: the longitudes of the stations
- start: the number of riders that start their trips from the corresponding stations
- tripdurationS: the median of trip durations that start from the corresponding stations
- end: the number of riders that end their trips to the corresponding stations
- tripdurationE: the median of trip durations that end to the corresponding stations
- month: the month that records belong to

Last modification: Feb 4, some records with extreme values were removed, for example, stations that have 0 in start/end.