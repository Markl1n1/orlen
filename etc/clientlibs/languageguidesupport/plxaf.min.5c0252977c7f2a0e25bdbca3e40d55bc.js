(function () {
  xfalib = {
    ut: {},
    script: { mixin: {}, dom: {} },
    view: { util: {}, layout: {} },
    runtime: { _private: {} },
    locale: {},
    acrobat: {},
    template: {},
    globals: { highlight: !1 },
  };
  window.xfalib = xfalib;
})();
(function (a) {
  a.locale.Strings = {
    pleaseTapText: "Dotknij tutaj \u017ceby zalogowa\u0107",
    pleaseClickText: "Klinkij tutaj \u017ceby zalogowa\u0107",
    clearSignature: "Wyczy\u015b\u0107 podpis",
    clearSignatureConfirm:
      "Czy jeste\u015b pewien \u017ce chcesz wyczy\u015bci\u0107 podpis?",
    fetchGeoLocation: "Pobieranie danych geolokalizacyjnych...",
    errorFetchGeoLocation:
      "B\u0142\u0105d podczas pobierania danych geolokalizacyjnych",
    pleaseSignText: "Podpisz tutaj",
    latitude: "Szeroko\u015b\u0107",
    longitude: "D\u0142ugo\u015b\u0107",
    time: "Czas",
    clearText: "Wyczy\u015b\u0107",
    validationIssue: "B\u0142\u0105d walidacji",
    warning: "Ostrze\u017cenie",
    errors: "B\u0142\u0105d",
    errorServerScript: "B\u0142\u0105d skryptu na serwerze",
    unableToConnectText: "Nie mo\u017cna po\u0142\u0105czy\u0107 z serwerem",
    errorSubmittingForm: "B\u0142\u0105d wysy\u0142ania formularza",
    ok: "OK",
    cancel: "Anuluj",
    yes: "Tak",
    no: "Nie",
    clear: "Wyczy\u015b\u0107",
    brushes: "P\u0119dzle",
    geolocation: "Geolokalizacja",
    FileCloseAccessText: "Wci\u015bnij Enter aby usun\u0105\u0107 plik",
    FileSizeGreater:
      "Rozmiar pliku/\u00f3w {0} jest wi\u0119kszy ni\u017c {1}MB.",
    FileNameInvalid:
      'Nazwa pliku nie mo\u017ce rozpoczyna\u0107 si\u0119 na (.), zawiera\u0107 \\ / : * ? " \x3c \x3e | ; % $, lub by\u0107 jednym z zastrze\u017conych s\u0142\u00f3w: nul, prn, con, lpt lub com.',
    FileMimeTypeInvalid: "Nieobs\u0142ugiwany format plik\u00f3w",
    UnableToSave: "Nie mo\u017cna zapisa\u0107",
    SavedSuccessfully: "Zapisano poprawnie",
    Attach: "Za\u0142\u0105cz",
    datePickerAriaLabel: "Wpisz dat\u0119 w formacie {0}",
  };
})(xfalib);
(function (a) {
  a.locale.LogMessages = {
    "ALC-FRM-901-001":
      "[ALC-FRM-901-001] : " + a.locale.Strings.errorServerScript,
    "ALC-FRM-901-002":
      "[ALC-FRM-901-002] : Exception occurred while executing {0} script for {1} : {2}.",
    "ALC-FRM-901-003": "[ALC-FRM-901-003] : Error: xfa is not initialized.",
    "ALC-FRM-901-004":
      "[ALC-FRM-901-004] : NullPointer Exception: {0} child {1} is null.",
    "ALC-FRM-901-005":
      "[ALC-FRM-901-005] : exception {0} in parsing user script. script:{1}.",
    "ALC-FRM-901-006": "[ALC-FRM-901-006] : Unsupported operation : {0}.",
    "ALC-FRM-901-007":
      "[ALC-FRM-901-007] : Error in running server scripts. Type mismatch old: {0}, new: {1}.",
    "ALC-FRM-901-008":
      "[ALC-FRM-901-008] : " + a.locale.Strings.unableToConnectText,
    "ALC-FRM-901-009":
      "[ALC-FRM-901-009] : Message Box with Yes/No are not supported and converted to Ok/Cancel message box but the return values are correct i.e for Yes/No",
    "ALC-FRM-901-010":
      "[ALC-FRM-901-010] : Message Box with 3 buttons are not supported",
    "ALC-FRM-901-011": "[ALC-FRM-901-011] : Geo Location not supported",
    "ALC-FRM-901-012":
      "[ALC-FRM-901-012] : Mixed mode data binding is not supported",
    "ALC-FRM-901-013": "[ALC-FRM-901-013] : Calculations failed after {0}",
    "ALC-FRM-901-014":
      "[ALC-FRM-901-014] : Validation failed for the object: {0}. Validate Script is {1}",
    "ALC-FRM-901-015":
      "[ALC-FRM-901-015] : exception {0} in creating user script object. user script:{1}, initialized from event: {2}, object : {3}",
    "ALC-FRM-901-016":
      "[ALC-FRM-901-016] : " + a.locale.Strings.errorSubmittingForm,
    "ALC-FRM-901-017":
      "[ALC-FRM-901-017] : Exception occurred {0} while accessing property {1} of {2}",
    "ALC-FRM-901-018":
      "[ALC-FRM-901-018] : This form may not render correctly as you are using an unsupported browser.",
    "ALC-FRM-901-019":
      "[ALC-FRM-901-019] : Exception occurred while resolving floating fields for : {0}.",
    "ALC-FRM-901-020":
      "[ALC-FRM-901-020] : Exception while Initializing Logger. Invalid Configuration {0} in {1}",
    "ALC-FRM-901-021":
      "[ALC-FRM-901-021] : Failed to parse dataPattern {0} for the value {1}: {2}",
    "ALC-FRM-901-022":
      "[ALC-FRM-901-022] : Skipped parsing Multiple dataPatterns  pattern {0} value {1}",
    "ALC-FRM-901-023":
      "[ALC-FRM-901-023] : Numeric Patterns having the format (pattern) are not supported. Skipping pattern {0} value {1}",
  };
})(xfalib);
