DROP TABLE IF EXISTS yl_roller;
create external table yl_roller(
automatic_operation_ptl string,
manual_mode_ptl string,
fault_indicator_light string,
fault_buzzer string,
gear_roll_running string,
gear_roll_fault_reset string,
gear_roll_inverter_fault string,
gear_roll_power_supply string,
emergency_stop string,
gear_roll_motor_temperature_normal string,
fault_indicator_light_hmi string,
auto_run_idle_mode string,
manual_mode string,
auto_run_indicator_light_hmi string,
fault_reset string,
mute string,
roller_inverter_fault string,
roller_trip string,
emergency_stop_active string,
roller_overheat_fault string,
roller_material_jam_fault string,
roller_material_jam_fault_current_fault string,
roller_speed string,
roller_current_frequency string,
roller_current_operating_current string,
system_running_time string,
power_data string


)
partitioned by (rtd_date string, rtd_hour string, rtd_line string, rtd_name string)
ROW FORMAT SERDE 'org.apache.hive.hcatalog.data.JsonSerDe'
location '/zec_data_yl/roller';