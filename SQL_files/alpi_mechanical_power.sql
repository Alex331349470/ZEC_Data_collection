create external table alpi_mechanical_powder (
    plc_alert_1 string,
    plc_alert_2 string,
    plc_alert_3 string,
    plc_alert_4 string,
    plc_alert_5 string,
    plc_alert_6 string,
    plc_alert_7 string,
    plc_alert_8 string,
    plc_alert_9 string,
    plc_alert_10 string,
    plc_alert_11 string,
    plc_alert_12 string,
    plc_alert_13 string,
    plc_alert_14 string,
    plc_alert_15 string,
    plc_alert_16 string,
    plc_alert_17 string,
    plc_alert_18 string,
    plc_alert_19 string,
    plc_alert_20 string,
    plc_alert_21 string,
    plc_alert_22 string,
    fault_auto_shutdown string,
    crusher_current_above_limit string,
    crusher_current_below_limit string,
    auto_ready string,
    auto_start_button string,
    auto_starting string,
    auto_stop_button string,
    auto_stopping string,
    sound_relief string,
    running_signal string,
    m01_motor_button_indication string,
    m02_motor_button_indication string,
    m08_motor_button_indication string,
    m09_motor_button_indication string,
    m10_motor_button_indication string,
    m13_motor_button_indication string,
    m03_motor_button_indication string,
    m04_motor_button_indication string,
    m05_motor_button_indication string,
    m16_motor_button_indication string,
    svc01_button_indication string,
    svc02_button_indication string,
    svc03_button_indication string,
    svc04_button_indication string,
    svc05_button_indication string,
    xvc01_button_indication string,
    xvc02_button_indication string,
    m06_motor_button_indication string,
    m07_motor_button_indication string,
    m11_motor_button_indication string,
    m12_motor_button_indication string,
    m15_motor_button_indication string,
    timc01_button_indication string,
    timc02_button_indication string,
    timc03_button_indication string,
    remote_emergency_stop_vibrating_screen_mark string,
    m01_motor_start_stop_button string,
    m08_motor_start_stop_button string,
    m09_motor_start_stop_button string,
    m10_motor_start_stop_button string,
    m13_motor_start_stop_button string,
    m03_motor_start_stop_button string,
    m04_motor_start_stop_button string,
    m05_motor_start_stop_button string,
    m16_motor_start_stop_button string,
    svc01_start_stop_button string,
    svc02_start_stop_button string,
    svc03_start_stop_button string,
    svc04_start_stop_button string,
    svc05_start_stop_button string,
    xvc01_start_stop_button string,
    xvc02_start_stop_button string,
    m06_motor_start_stop_button string,
    m07_motor_start_stop_button string,
    m11_motor_start_stop_button string,
    m12_motor_start_stop_button string,
    m15_motor_start_stop_button string,
    timc01_start_stop_button string,
    timc02_start_stop_button string,
    timc03_start_stop_button string,
    m14_motor_start_stop_button string,
    chiller_start_stop string,
    f01_fault_feedback_in string,
    f03_fault_feedback_in string,
    m01_fault_feedback_in string,
    m02_fault_feedback_in string,
    m08_fault_feedback_in string,
    m09_fault_feedback_in string,
    m04_operation_feedback_in string,
    m05_operation_feedback_in string,
    m03_fault_feedback_in string,
    m04_fault_feedback_in string,
    m05_fault_feedback_in string,
    m06_fault_feedback_in string,
    remote_emergency_stop_vibrating_screen string,
    mx_cl01_warehouse_feeding_in_progress string,
    mx_cl02_warehouse_feeding_in_progress string,
    chiller_operation_feedback string,
    m01_motor_out string,
    m02_motor_out string,
    m08_motor_out string,
    m09_motor_out string,
    m10_motor_out string,
    m03_motor_out string,
    m04_motor_out string,
    m05_motor_out string,
    svc02_out string,
    svc03_out string,
    m06_motor_out string,
    m13_motor_out string,
    svc01_out string,
    svc04_out string,
    svc05_out string,
    xvc01_out string,
    xvc02_out string,
    m07_motor_out string,
    m11_motor_out string,
    m12_motor_out string,
    m15_motor_out string,
    timc01_out string,
    timc02_out string,
    timc03_out string,
    m14_motor_out string,
    system_alarm string,
    chiller_startup string,

    fan_1_frequency_setting string,
    fan_1_operating_frequency string,
    fan_1_operating_current string,
    fan_2_frequency_setting string,
    fan_2_operating_frequency string,
    fan_2_operating_current string,
    main_engine_frequency_setting string,
    main_engine_operating_frequency string,
    main_engine_operating_current string,
    grading_frequency_setting string,
    grading_operating_frequency string,
    grading_operating_current string,
    induced_draft_fan_frequency_setting string,
    induced_draft_fan_operating_frequency string,
    induced_draft_fan_operating_current string,
    material_discharge_fan_frequency_setting string,
    material_discharge_fan_operating_frequency string,
    material_discharge_fan_operating_current string,
    grading_speed string,
    phase_a_current string,
    phase_b_current string,
    phase_c_current string,
    phase_a_voltage string,
    phase_b_voltage string,
    phase_c_voltage string,
    wi01_weight_display_2 string,
    wi02_weight_display_2 string,
    warehouse_a_material_release_flag string,
    warehouse_b_material_release_flag string,
    vibration_of_the_host string,
    return_air_temperature string,
    return_air_humidity string,
    return_air_pressure string,
    return_air_flow_rate string,
    energy_consumption string,
    rtd_timestamp string
)
partitioned by (rtd_date string, rtd_hour string, rtd_line string, rtd_name string)
ROW FORMAT SERDE 'org.apache.hive.hcatalog.data.JsonSerDe'
location '/zec_data/alpi_mechanical_powder';