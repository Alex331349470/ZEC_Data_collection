create external table monitor_thermometer (
    humidity string,
    temperature string,
    dew_point string,
    rtd_timestamp string
)
partitioned by (rtd_date string, rtd_hour string, rtd_line string, rtd_name string)
ROW FORMAT SERDE 'org.apache.hive.hcatalog.data.JsonSerDe'
location '/zec_data/thermometer';
