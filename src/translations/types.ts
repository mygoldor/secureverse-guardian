
// Type definitions for translations
export interface TranslationKeys {
  // General
  app_name: string;
  loading: string;
  error: string;
  success: string;
  confirm: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  
  // Authentication
  login: string;
  signup: string;
  logout: string;
  email: string;
  password: string;
  confirm_password: string;
  forgot_password: string;
  reset_password: string;
  
  // Navigation
  home: string;
  dashboard: string;
  settings: string;
  profile: string;
  help: string;
  
  // Landing page
  hero_title: string;
  hero_subtitle: string;
  get_started: string;
  discover_guardia: string;
  change_language: string;
  
  // Features
  file_scan: string;
  real_time_protection: string;
  network_scan: string;
  password_manager: string;
  
  // Dashboard
  security_status: string;
  last_scan: string;
  threats_detected: string;
  protected_devices: string;
  
  // Pricing
  monthly_plan: string;
  yearly_plan: string;
  
  // Footer
  privacy_policy: string;
  terms_of_service: string;
  contact_us: string;
  
  // Cookies
  cookie_consent: string;
  accept_all: string;
  reject_all: string;
  customize: string;
  
  // Error messages
  required_field: string;
  invalid_email: string;
  password_mismatch: string;
  
  // Success messages
  account_created: string;
  password_reset: string;

  // Navigation and Footer
  navigation: string;
  features: string;
  pricing: string;
  testimonials: string;
  contact: string;
  legal: string;
  legal_mentions: string;
  terms_of_use: string;
  cookie_management: string;
  company_address: string;
  rights_reserved: string;

  // Security Agent
  security_agent: string;
  security_agent_description: string;
  backup: string;
  network: string;
  processes: string;
  logs: string;
  security_agent_footer: string;

  // Cookie Banner
  reject: string;
  accept: string;
  preferences: string;
  cookies: string;
  cookie_preferences_description: string;
  
  // Cookie Preferences
  gdpr_compliant: string;
  cookie_policy: string;
  save_preferences: string;
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

  // Dashboard Components
  scan_details: string;
  successful: string;
  scan_failed: string;
  threats_found: string;
  threat_details: string;
  download_report: string;
  phishing_attempt_detected: string;
  suspicious_login_detected: string;
  today_time: string;
  change_password: string;
  potential_malware: string;
  suspicious_program_detected: string;
  yesterday_time: string;
  scan_and_quarantine: string;
  security_update_available: string;
  important_security_update: string;
  days_ago: string;
  update_now: string;
  high_priority: string;
  medium_priority: string;
  low_priority: string;
  learn_more: string;
  resolved: string;
  no_active_alerts: string;
  system_secure: string;
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
  
  // Security Dashboard
  active: string;
  security_alerts: string;
  alerts: string;
  automatic_backup: string;
  yesterday: string;
  quick_scan: string;
  
  // CTA Section
  cta_title: string;
  cta_subtitle: string;
  signup_now: string;
  
  // Features Section
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
  
  // Pricing Section
  pricing_title: string;
  pricing_subtitle: string;
  monthly_plan_description: string;
  monthly_price: string;
  features_title: string;
  feature_1_title: string;
  feature_1_description: string;
  feature_2_title: string;
  feature_2_description: string;
  choose_plan: string;
  save_with_yearly: string;
  yearly_plan_description: string;
  yearly_price: string;
  save_text: string;
  
  // Testimonials
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
  
  // Plan Selection
  plan_selection: string;
  
  // Security Components
  backup_complete: string;
  backup_failed: string;
  quarantine_load_failed: string;
  file_restored: string;
  file_restore_failed: string;
  file_deleted: string;
  file_delete_failed: string;
  file_scan_complete: string;
  file_safe: string;
  file_unsafe: string;
  file_scan_failed: string;
  security_management: string;
  backup_and_quarantine: string;
  quarantine: string;
  selected_directory: string;
  no_directory_selected: string;
  select_directory: string;
  backing_up: string;
  backup_files: string;
  quarantined_files: string;
  refresh: string;
  loading_quarantined_files: string;
  no_quarantined_files: string;
  no_threats_in_quarantine: string;
  safe: string;
  unsafe: string;
  restore: string;
  scan_file: string;
  threats_found_in_directory: string;
  scan_complete: string;
  no_threats_found_in_directory: string;
  scanning_directory: string;
  scanning: string;
  scan_directory: string;
  file_scanner: string;
  directory_scan: string;
  scan_history: string;
  no_threats_found: string;
  quarantine_complete: string;
  quarantine_failed: string;
  selected_file: string;
  no_file_selected: string;
  select_file: string;
  quarantine_file: string;
  security_logs: string;
  no_logs_available: string;
  suspicious_processes: string;
  name: string;
  status: string;
  no_suspicious_processes: string;
  ip_address: string;
  mac_address: string;
  actions: string;
  suspicious: string;
  blocked: string;
  normal: string;
  block_ip: string;
  scanning_network: string;
  scan_network: string;
  monitor_network: string;
  stop_monitoring: string;
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
  network_scanner: string;
  suspicious_process_detected: string;
  suspicious_processes_found: string;
  process_monitoring_started: string;
  process_monitoring_stopped: string;
  process_terminated: string;
  process_id: string;
  process_termination_failed: string;
  ip_unblocked: string;
  ip_unblock_failed: string;
  security_monitor: string;
  process_monitor: string;
  firewall: string;
  start_monitoring: string;
  stop_monitoring: string;
  process_name: string;
  cpu_usage: string;
  memory_usage: string;
  terminate: string;
  enter_ip_address: string;
  unblock: string;
  no_blocked_ips: string;
  back_to_history: string;
  rescan: string;
  item_type: string;
  file: string;
  directory: string;
  scan_status: string;
  clean: string;
  scan_date: string;
  scan_time: string;
  path: string;
  threat: string;
  threats: string;
  detected: string;
  suspicious_behavior: string;
  malware_signature_match: string;
  details: string;
  search_scans: string;
  sort_newest: string;
  sort_oldest: string;
  calendar_view: string;
  no_matching_scans: string;
  no_scan_history: string;
  
  // Dashboard Pages
  security_summary: string;
  recent_alerts: string;
  threat_analysis: string;
  analysis_history: string;
  security_settings: string;
  my_subscription: string;
  
  // Login and Signup
  login_success: string;
  login_failed: string;
  login_to_guardia: string;
  email_address: string;
  enter_your_email: string;
  enter_your_password: string;
  dont_have_account: string;
  create_account: string;
  passwords_dont_match: string;
  signup_success: string;
  signup_failed: string;
  create_account_guardia: string;
  full_name: string;
  enter_your_name: string;
  confirm_your_password: string;
  already_have_account: string;
}
