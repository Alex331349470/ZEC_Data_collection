create external table auto_line (
    run_time_minutes string,
    run_time_hours string,
    run_time_days string,
    power_consumption string,
    voltage_a string,
    voltage_b string,
    voltage_c string,
    voltage_ab string,
    voltage_bc string,
    voltage_ca string,
    current_a string,
    current_b string,
    current_c string,
    capacity string,
    pallets_amount string,
    product_count_day string,
    product_weight_day string,
    sagger_current_weight string,
    sagger_product_weight string,
    bin_current_weight string,
    bin_full_weight string,
    bin_bottom_level_signal string,
    tank_1_current_weight string,
    tank_1_full_weight string,
    tank_1_low_level_weight string,
    tank_2_current_weight string,
    tank_2_full_weight string,
    tank_2_low_level_weight string,
    shaking_time string,
    shaking_and_mixing_time string,
    pouring_time_delay string,
    discharge_reversal_time string,
    bin_vibrator_time string,
    discharge_waiting_time string,
    air_bag_descending_time_delay string,
    early_shift_production string,
    mid_shift_production string,
    late_shift_production string,
    next_day_update_trigger_button string,
    early_shift_weight string,
    mid_shift_weight string,
    late_shift_weight string,
    next_day_update_trigger_button_1 string,
    current_weight string,
    loading_bowl_weight_update_trigger_button string,
    loading_transfer_m1_high_frequency string,
    loading_transfer_m1_low_frequency string,
    loading_screw_m2_high_frequency string,
    loading_screw_m2_low_frequency string,
    shaking_transfer_m1_high_frequency string,
    shaking_transfer_m1_low_frequency string,
    stacking_bowl_a_motor_high_frequency string,
    stacking_bowl_a_motor_low_frequency string,
    stacking_bowl_b_motor_high_frequency string,
    stacking_bowl_b_motor_low_frequency string,
    fan_m1_high_frequency string,
    fan_m1_low_frequency string,
    fan_m2_high_frequency string,
    fan_m2_low_frequency string,
    vibrating_feeder_m1_high_frequency string,
    vibrating_feeder_m1_low_frequency string,
    vibrating_feeder_m2_high_frequency string,
    vibrating_feeder_m2_low_frequency string,
    high_frequency_push_bowl_m2_in_furnace_1 string,
    low_frequency_push_bowl_m2_in_furnace_1 string,
    high_frequency_push_bowl_m2_in_furnace_2 string,
    low_frequency_push_bowl_m2_in_furnace_2 string,
    high_frequency_tumbling_motor_out_of_furnace_1 string,
    low_frequency_tumbling_motor_out_of_furnace_1 string,
    high_frequency_tumbling_motor_out_of_furnace_2 string,
    low_frequency_tumbling_motor_out_of_furnace_2 string,
    high_frequency_m1_bowl_transfer string,
    low_frequency_m1_bowl_transfer string,
    high_frequency_material_pouring_transfer_m1 string,
    low_frequency_material_pouring_transfer_m1 string,
    current_weight_of_warehouse_1 string,
    current_weight_of_warehouse_2 string,
    loading_slowdown_delay string,
    loading_positioning_delay string,
    shaking_slowdown_delay string,
    shaking_positioning_delay string,
    stacking_section_a_slowdown_delay string,
    stacking_section_a_positioning_delay string,
    stacking_section_b_slowdown_delay string,
    stacking_section_b_positioning_delay string,
    furnace_1_a_section_positioning_delay string,
    furnace_1_b_section_positioning_delay string,
    furnace_1_c_section_positioning_delay string,
    furnace_1_d_section_positioning_delay string,
    furnace_2_a_section_positioning_delay string,
    furnace_2_b_section_positioning_delay string,
    furnace_2_c_section_positioning_delay string,
    furnace_2_d_section_positioning_delay string,
    out_of_furnace_1_entrance_1_delay string,
    out_of_furnace_1_entrance_2_delay string,
    out_of_furnace_2_entrance_1_delay string,
    out_of_furnace_2_entrance_2_delay string,
    bowl_transfer_slowdown_delay string,
    splitting_positioning_delay string,
    material_pouring_section_a_slowdown_delay string,
    material_pouring_section_a_positioning_delay string,
    material_pouring_section_b_slowdown_delay string,
    material_pouring_section_b_positioning_delay string,
    corner_1_positioning_delay string,
    corner_2_positioning_delay string,
    lifting_1_positioning_delay string,
    lifting_2_positioning_delay string,
    lifting_3_positioning_delay string,
    turn_1_cylinder_delay string,
    turn_2_cylinder_delay string,
    switch_can_ab string,
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
    plc_alert_23 string,
    plc_alert_24 string,
    plc_alert_25 string,
    plc_alert_26 string,
    plc_alert_27 string,
    plc_alert_28 string,
    plc_alert_29 string,
    plc_alert_30 string,
    plc_alert_31 string,
    plc_alert_32 string,
    plc_alert_33 string,
    plc_alert_34 string,
    plc_alert_35 string,
    plc_alert_36 string,
    plc_alert_37 string,
    plc_alert_38 string,
    plc_alert_39 string,
    plc_alert_40 string,
    plc_alert_41 string,
    plc_alert_42 string,
    plc_alert_43 string,
    plc_alert_44 string,
    plc_alert_45 string,
    plc_alert_46 string,
    plc_alert_47 string,
    plc_alert_48 string,
    plc_alert_49 string,
    plc_alert_50 string,
    plc_alert_51 string,
    plc_alert_52 string,
    plc_alert_53 string,
    plc_alert_54 string,
    plc_alert_55 string,
    plc_alert_56 string,
    plc_alert_57 string,
    plc_alert_58 string,
    plc_alert_59 string,
    plc_alert_60 string,
    plc_alert_61 string,
    plc_alert_62 string,
    plc_alert_63 string,
    plc_alert_64 string,
    plc_alert_65 string,
    plc_alert_66 string,
    plc_alert_67 string,
    plc_alert_68 string,
    plc_alert_69 string,
    plc_alert_70 string,
    plc_alert_71 string,
    plc_alert_72 string,
    plc_alert_73 string,
    plc_alert_74 string,
    plc_alert_75 string,
    plc_alert_76 string,
    plc_alert_77 string,
    plc_alert_78 string,
    plc_alert_79 string,
    plc_alert_80 string,
    plc_alert_81 string,
    plc_alert_82 string,
    plc_alert_83 string,
    plc_alert_84 string,
    plc_alert_85 string,
    plc_alert_86 string,
    plc_alert_87 string,
    plc_alert_88 string,
    plc_alert_89 string,
    plc_alert_90 string,
    plc_alert_91 string,
    plc_alert_92 string,
    plc_alert_93 string,
    plc_alert_94 string,
    plc_alert_95 string,
    plc_alert_96 string,
    plc_alert_97 string,
    plc_alert_98 string,
    plc_alert_99 string,
    plc_alert_100 string,
    plc_alert_101 string,
    plc_alert_102 string,
    plc_alert_103 string,
    plc_alert_104 string,
    plc_alert_105 string,
    plc_alert_106 string,
    plc_alert_107 string,
    plc_alert_108 string,
    plc_alert_109 string,
    plc_alert_110 string,
    plc_alert_111 string,
    plc_alert_112 string,
    plc_alert_113 string,
    plc_alert_114 string,
    plc_alert_115 string,
    plc_alert_116 string,
    plc_alert_117 string,
    plc_alert_118 string,
    plc_alert_119 string,
    plc_alert_120 string,
    plc_alert_121 string,
    plc_alert_122 string,
    plc_alert_123 string,
    plc_alert_124 string,
    plc_alert_125 string,
    plc_alert_126 string,
    plc_alert_127 string,
    plc_alert_128 string,
    plc_alert_129 string,
    plc_alert_130 string,
    plc_alert_131 string,
    plc_alert_132 string,
    plc_alert_133 string,
    plc_alert_134 string,
    plc_alert_135 string,
    plc_alert_136 string,
    plc_alert_137 string,
    plc_alert_138 string,
    plc_alert_139 string,
    plc_alert_140 string,
    plc_alert_141 string,
    plc_alert_142 string,
    plc_alert_143 string,
    plc_alert_144 string,
    plc_alert_145 string,
    plc_alert_146 string,
    plc_alert_147 string,
    plc_alert_148 string,
    plc_alert_149 string,
    plc_alert_150 string,
    plc_alert_151 string,
    plc_alert_152 string,
    plc_alert_153 string,
    plc_alert_154 string,
    plc_alert_155 string,
    plc_alert_156 string,
    plc_alert_157 string,
    plc_alert_158 string,
    plc_alert_159 string,
    plc_alert_160 string,
    plc_alert_161 string,
    plc_alert_162 string,
    plc_alert_163 string,
    plc_alert_164 string,
    plc_alert_165 string,
    plc_alert_166 string,
    plc_alert_167 string,
    plc_alert_168 string,
    plc_alert_169 string,
    plc_alert_170 string,
    plc_alert_171 string,
    plc_alert_172 string,
    plc_alert_173 string,
    plc_alert_174 string,
    plc_alert_175 string,
    plc_alert_176 string,
    plc_alert_177 string,
    plc_alert_178 string,
    plc_alert_179 string,
    plc_alert_180 string,
    plc_alert_181 string,
    plc_alert_182 string,
    plc_alert_183 string,
    plc_alert_184 string,
    plc_alert_185 string,
    plc_alert_186 string,
    plc_alert_187 string,
    plc_alert_188 string,
    plc_alert_189 string,
    plc_alert_190 string,
    plc_alert_191 string,
    plc_alert_192 string,
    plc_alert_193 string,
    plc_alert_194 string,
    plc_alert_195 string,
    plc_alert_196 string,
    plc_alert_197 string,
    plc_alert_198 string,
    plc_alert_199 string,
    plc_alert_200 string,
    plc_alert_201 string,
    plc_alert_202 string,
    plc_alert_203 string,
    plc_alert_204 string,
    plc_alert_205 string,
    plc_alert_206 string,
    plc_alert_207 string,
    plc_alert_208 string,
    rtd_timestamp string
)
partitioned by (rtd_date string, rtd_hour string, rtd_line string, rtd_name string)
ROW FORMAT SERDE 'org.apache.hive.hcatalog.data.JsonSerDe'
location '/zec_data/auto_line';