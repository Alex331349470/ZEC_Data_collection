create external table kiln_jp (
    up string,
    down string,
    rtd_timestamp string
)
partitioned by (rtd_date string, rtd_hour string, rtd_line string, rtd_name string)
ROW FORMAT SERDE 'org.apache.hive.hcatalog.data.JsonSerDe'
location '/zec_data/kiln_jp';