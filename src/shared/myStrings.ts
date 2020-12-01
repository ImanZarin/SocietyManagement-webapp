import { MyConstants } from "./Constants";

export class MyStrings {
  static readonly admin_home_btn_owner = "مالک ها";
  static readonly admin_home_btn_tenant = "مستأجران";
  static readonly admin_home_btn_staff = "کارمندان";
  static readonly admin_home_btn_house = "آپارتمان ها";
  static readonly admin_home_btn_news = "اخبار";
  static readonly admin_home_btn_election = "انتخابات";
  static readonly loading_main = "در حال بررسی";
  static readonly error_general =
    "مشکلی در سیستم رخ داده است، لطفاً دوباره تلاش کنید.";
  static readonly admin_user_table_1_user = "واحد";
  static readonly admin_user_table_1_staff = "سمت";
  static readonly admin_user_table_2 = "نام خانوادگی";
  static readonly admin_user_table_3 = "تلفن";
  static readonly admin_user_table_4 = "ایمیل";
  static readonly admin_user_new_header_owner = "فرم مالک جدید";
  static readonly admin_user_new_header_tenant = "فرم مستأجر جدید";
  static readonly admin_user_new_header_staff = "فرم کارمند جدید";
  static readonly form_user_firstname = "نام";
  static readonly form_user_lastname = "نام خانوادگی";
  static readonly form_user_phone = "تلفن";
  static readonly form_user_email = "ایمیل";
  static readonly form_user_position = "سمت";
  static readonly form_user_house = "شماره واحد";
  static readonly form_required_error = "این فیلد باید پر شود";
  static readonly form_user_email_error = "فرمت ایمیل صحیح نمی باشد";
  static readonly form_user_short_error =
    "تعداد ارقام شماره تلفن بیشتر می باشد";
  static readonly form_user_long_error = "تعداد ارقام شماره تلفن کمتر می باشد";
  static readonly form_user_number_error = "شماره تلفن در فرمت مناسب نیست";
  static readonly form_user_submit_create = "اضافه";
  static readonly form_user_submit_update = "ثبت تغییرات";
  static readonly form_user_dropdown = "انتخاب خانه";
  static readonly form_user_delete = "حذف";
  static readonly form_login_id_short = "کد ملی شما طولانی تر می باشد";
  static readonly form_login_id_long = "کد ملی شما کوتاهتر می باشد";
  static readonly form_login_pass_short = `رمزحداقل  ${MyConstants.minPassLength} کاراکتر می باشد`;
  static readonly form_login_pass_long = `رمز حداکثر  ${MyConstants.maxPassLength} کاراکتر می باشد`;
  static readonly form_login_id = "کد ملی";
  static readonly form_login_pass = "رمز عبور";
  static readonly form_login_submit = "ورود";
}
