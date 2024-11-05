DROP TABLE IF EXISTS yl_pack_mixer;
create external table yl_pack_mixer(
brake_overload string,
power_supply string,
hopper_horizontal_position string,
safety_alert string,
safety_barrier string,
inverter_alarm_input string,
emergency_stop string,
top_barrier string,
vacuum_unloading string,
shutdown_output string,
mixed_forward string,
mixed_reverse string,
light_alarm string,
inertia_stopping string,
printing string,
running_indicator string,
brake_open string,
safety_barrier_alarm string,
safety_alert_alarm string,
top_barrier_open_alarm string,
comprehensive_alarm string,
vacuum_unloading_alarm string,
mixed_process_alarm string,
mixing_forward string,
mixing_reverse string,
execute_mixing string,
pause_mixing string,
manual_mixing_operation string,
mixing_end string,
running_completion_reset string,
mixing_speed_setting string,
mixing_time_setting string


)
partitioned by (rtd_date string, rtd_hour string, rtd_line string, rtd_name string)
ROW FORMAT SERDE 'org.apache.hive.hcatalog.data.JsonSerDe'
location '/zec_data_yl/pack_mixer';