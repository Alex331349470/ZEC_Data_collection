DROP TABLE IF EXISTS yl_<table>;
create external table yl_<table>(


)
partitioned by (rtd_date string, rtd_hour string, rtd_line string, rtd_name string)
ROW FORMAT SERDE 'org.apache.hive.hcatalog.data.JsonSerDe'
location '/zec_data_yl/<table>';