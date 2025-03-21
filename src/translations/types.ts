
// Define the translation structure as a TypeScript type for better type safety
export type TranslationKeys = {
  // General
  app_name: string;
  get_started: string;
  learn_more: string;
  contact_us: string;
  login: string;
  logout: string;
  signup: string;
  email: string;
  password: string;
  confirm_password: string;
  forgot_password: string;
  error: string;
  login_success: string;
  login_failed: string;
  dont_have_account: string;
  signup_success: string;
  signup_failed: string;
  
  // Navigation
  home: string;
  features: string;
  pricing: string;
  about: string;
  faq: string;
  blog: string;
  testimonials: string;
  contact: string;
  navigation: string;
  
  // Hero section
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  
  // Features section
  features_title: string;
  feature_1_title: string;
  feature_1_description: string;
  feature_2_title: string;
  feature_2_description: string;
  feature_3_title: string;
  feature_3_description: string;
  
  // Testimonials section
  testimonials_title: string;
  testimonial_quote_1: string;
  testimonial_name_1: string;
  testimonial_title_1: string;
  testimonial_quote_2: string;
  testimonial_name_2: string;
  testimonial_title_2: string;
  testimonial_quote_3: string;
  testimonial_name_3: string;
  testimonial_title_3: string;
  
  // Pricing section
  pricing_title: string;
  pricing_subtitle: string;
  monthly: string;
  yearly: string;
  basic_plan: string;
  pro_plan: string;
  enterprise_plan: string;
  month: string;
  year: string;
  save_text: string;
  billed_annually: string;
  current_plan: string;
  select_plan: string;
  contact_sales: string;
  plan_selection: string;
  monthly_plan: string;
  yearly_plan: string;
  monthly_price: string;
  yearly_price: string;
  monthly_plan_description: string;
  yearly_plan_description: string;
  save_with_yearly: string;
  choose_plan: string;
  
  // CTA section
  cta_title: string;
  cta_subtitle: string;
  cta_button: string;
  
  // Footer
  rights_reserved: string;
  terms: string;
  privacy: string;
  cookies: string;
  legal: string;
  cookie_management: string;
  legal_mentions: string;
  privacy_policy: string;
  terms_of_use: string;
  company_address: string;
  
  // Dashboard page
  dashboard: string;
  quick_scan: string;
  analyse_rapide: string;
  change_language: string;

  // Security elements
  security_agent: string;
  security_agent_description: string;
  security_agent_footer: string;
  file_scan: string;
  directory_scan: string;
  scan_history: string;
  backup: string;
  network: string;
  processes: string;
  logs: string;
  file_scanner: string;
  network_scanner: string;
  security_monitor: string;
  security_management: string;
  backup_and_quarantine: string;
  scanning: string;
  scan_network: string;
  scanning_network: string;
  monitor_network: string;
  stop_monitoring: string;
  scan_file: string;
  scan_directory: string;
  scanning_directory: string;
  quarantine_file: string;
  details: string;
  clean: string;
  threat: string;
  threats: string;
  detected: string;
  scan_complete: string;
  no_threats_found: string;
  threats_found: string;
  scan_failed: string;
  threats_detected: string;
  threats_found_in_directory: string;
  no_threats_found_in_directory: string;
  selected_file: string;
  selected_directory: string;
  no_file_selected: string;
  no_directory_selected: string;
  select_file: string;
  select_directory: string;
  quarantine_complete: string;
  quarantine_failed: string;
  
  // Backup and quarantine
  backup_complete: string;
  backup_failed: string;
  backing_up: string;
  backup_files: string;
  quarantine_load_failed: string;
  file_restored: string;
  file_restore_failed: string;
  file_deleted: string;
  file_delete_failed: string;
  file_scan_complete: string;
  file_safe: string;
  file_unsafe: string;
  file_scan_failed: string;
  quarantine: string;
  quarantined_files: string;
  refresh: string;
  loading_quarantined_files: string;
  no_quarantined_files: string;
  no_threats_in_quarantine: string;
  safe: string;
  unsafe: string;
  restore: string;
  delete: string;
  
  // Scan history
  back_to_history: string;
  rescan: string;
  scan_details: string;
  item_type: string;
  file: string;
  directory: string;
  scan_status: string;
  scan_date: string;
  scan_time: string;
  path: string;
  threat_details: string;
  suspicious_behavior: string;
  malware_signature_match: string;
  search_scans: string;
  sort_newest: string;
  sort_oldest: string;
  calendar_view: string;
  no_matching_scans: string;
  no_scan_history: string;
  
  // Network and monitoring
  ip_address: string;
  mac_address: string;
  status: string;
  actions: string;
  suspicious: string;
  blocked: string;
  normal: string;
  block_ip: string;
  network_scan_complete: string;
  found_devices: string;
  network_scan_failed: string;
  new_devices_detected: string;
  new_devices_on_network: string;
  suspicious_connection_detected: string;
  suspicious_devices_found: string;
  network_monitoring_started: string;
  monitoring_active: string;
  monitoring_failed: string;
  network_monitoring_stopped: string;
  monitoring_inactive: string;
  ip_blocked: string;
  ip_block_failed: string;
  
  // Process monitoring
  suspicious_process_detected: string;
  suspicious_processes_found: string;
  process_monitoring_started: string;
  process_monitoring_stopped: string;
  process_terminated: string;
  process_id: string;
  process_termination_failed: string;
  ip_unblocked: string;
  ip_unblock_failed: string;
  process_monitor: string;
  firewall: string;
  start_monitoring: string;
  process_name: string;
  cpu_usage: string;
  memory_usage: string;
  terminate: string;
  enter_ip_address: string;
  unblock: string;
  no_blocked_ips: string;
  
  // System logs
  security_logs: string;
  no_logs_available: string;
  suspicious_processes: string;
  name: string;
  no_suspicious_processes: string;
  
  // Additional landing page translations
  discover_guardia: string;
  computer_security: string;
  real_time_monitoring: string;
  real_time_monitoring_desc: string;
  malware_protection: string;
  malware_protection_desc: string;
  auto_backup: string;
  auto_backup_desc: string;
  vulnerability_analysis: string;
  vulnerability_analysis_desc: string;
  security_reports: string;
  security_reports_desc: string;
  multi_device_protection: string;
  multi_device_protection_desc: string;
  key_features: string;
  
  // CTA section additional fields
  ready_to_protect: string;
  signup_now: string;
  enter_your_email: string;
  create_account: string;
  cancel_anytime: string;
  full_protection: string;
  quick_installation: string;
  thirty_day_guarantee: string;
  
  // Dashboard additional fields
  security_summary: string;
  recent_alerts: string;
  threat_analysis: string;
  analysis_history: string;
  security_settings: string;
  my_subscription: string;
  real_time_protection: string;
  active: string;
  last_scan: string;
  security_alerts: string;
  alerts: string;
  automatic_backup: string;
  successful: string;
  yesterday: string;
  
  // Login and signup pages
  login_to_guardia: string;
  email_address: string;
  enter_your_password: string;
  create_account_guardia: string;
  full_name: string;
  enter_your_name: string;
  confirm_your_password: string;
  already_have_account: string;
  passwords_dont_match: string;
  passwords_dont_match_desc: string;
  signup_success_desc: string;
  
  // Security alerts
  phishing_attempt_detected: string;
  suspicious_login_detected: string;
  today_time: string;
  yesterday_time: string;
  days_ago: string;
  change_password: string;
  potential_malware: string;
  suspicious_program_detected: string;
  scan_and_quarantine: string;
  security_update_available: string;
  important_security_update: string;
  update_now: string;
  high_priority: string;
  medium_priority: string;
  low_priority: string;
  resolved: string;
  no_active_alerts: string;
  system_secure: string;
  
  // Additional translations for AnalysisHistory and SecuritySettings
  download_report: string;
  notifications: string;
  email_notifications: string;
  receive_email_alerts: string;
  sms_notifications: string;
  receive_sms_alerts: string;
  authentication: string;
  two_factor_authentication: string;
  secure_account_further: string;
  last_changed: string;
  change: string;
  login_history: string;
  view_all: string;
  failed: string;
  
  // Cookie banner
  accept: string;
  reject: string;
  accept_all: string;
  reject_all: string;
  save_preferences: string;
  cookie_preferences_description: string;
  essential_cookies: string;
  essential_cookies_description: string;
  essential_cookies_required: string;
  functional_cookies: string;
  functional_cookies_description: string;
  functional_cookies_info: string;
  analytics_cookies: string;
  analytics_cookies_description: string;
  analytics_cookies_info: string;
  marketing_cookies: string;
  marketing_cookies_description: string;
  marketing_cookies_info: string;
  gdpr_compliant: string;
  cookie_policy: string;
};
