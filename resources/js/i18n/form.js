
/******* This in an example template ***********
 This file does nothing since English is the default language
 build into simple react validator.
 Copy this file to add more
 supported languages. This is a great reference for translations
 of these messages: https://github.com/caouecs/Laravel-lang/tree/master/src
 If you don't have a translation for a line, comment out that line
 and move on. It is smart enough to fall back to the default English
 and hopefully someone else will contribute to fill in the gaps later!
 Note: the "const" variable name will be the camelCase filename.
 /**********************************************/
import SimpleReactValidator from "simple-react-validator";
const templateId = {
  accepted             : 'The :attribute must be accepted.',
  after                : 'The :attribute must be after :date.',
  after_or_equal       : 'The :attribute must be after or on :date.',
  alpha                : 'The :attribute may only contain letters.',
  alpha_space          : 'Pastikan hanya katakter alphabetik spasi.',
  alpha_num            : 'The :attribute may only contain letters and numbers.',
  alpha_num_space      : 'The :attribute may only contain letters, numbers, and spaces.',
  alpha_num_dash       : 'Pastikan tidak terdapat spasi.',
  alpha_num_dash_space : 'The :attribute may only contain letters, numbers, dashes, and spaces.',
  array                : 'The :attribute must be an array.',
  before               : 'The :attribute must be before :date.',
  before_or_equal      : 'The :attribute must be before or on :date.',
  between              : 'The :attribute must be between :min and :max:type.',
  boolean              : 'The :attribute must be a boolean.',
  card_exp             : 'The :attribute must be a valid expiration date.',
  card_num             : 'The :attribute must be a valid credit card number.',
  currency             : 'The :attribute must be a valid currency.',
  date                 : 'The :attribute must be a date.',
  date_equals          : 'The :attribute must be on :date.',
  email                : 'Alamat email tidak sesuai.',
  in                   : 'The selected :attribute must be :values.',
  integer              : 'The :attribute must be an integer.',
  max                  : 'The :attribute may not be greater than :max:type.',
  min                  : 'Minimal :min karakter.',
  not_in               : 'The selected :attribute must not be :values.',
  not_regex            : 'The :attribute must not match the required pattern.',
  numeric              : 'Hanya boleh angka.',
  phone                : 'The :attribute must be a valid phone number.',
  regex                : 'The :attribute must match the required pattern.',
  required             : 'Wajib di isi.',
  size                 : 'Harus :size karakter.',
  string               : 'The :attribute must be a string.',
  typeof               : 'The :attribute is not the correct type of :type.',
  url                  : 'The :attribute must be a url.',
};
SimpleReactValidator.addLocale('id', templateId);