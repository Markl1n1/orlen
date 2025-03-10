/*******************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 * Copyright 2015 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by all applicable intellectual property
 * laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 *
 * CUSTOM CODE - lines 59-65: after displaying success message in iframe - set proper iframe height to shrink it
 ******************************************************************************/

(function () {
  var guideBridge,
    aemFormConfig,
    onSubmit = function (guideResultObj) {
      var data = guideResultObj.data,
        formSelector = guideBridge.SELECTOR_FORM_CONTAINER,
        element,
        iframeDocument,
        afSuccessPayload = JSON.parse(data.afSuccessPayload);
      if (aemFormConfig.thankyouConfig === "page") {
        var inlineSubmitTypeWithoutIframe =
            aemFormConfig.useIframe === "false" &&
            aemFormConfig.submitType === "inline",
          pageRefreshSubmitTypeWithIframe =
            aemFormConfig.useIframe === "true" &&
            aemFormConfig.submitType === "pageRefresh";

        if (pageRefreshSubmitTypeWithIframe) {
          window.parent.window.location.href = afSuccessPayload.thankYouContent;
        } else if (inlineSubmitTypeWithoutIframe) {
          var message = "Refresh page on submission not selected.";
          if (window.console && window.console.warn) {
            console.warn(message);
          } else {
            guideBridge._guide.logger().log(message);
          }
        }

        guideBridge._guide.executeExpression("submitSuccess", afSuccessPayload);
      } else {
        if (aemFormConfig.useIframe !== "false") {
          iframeDocument =
            document.querySelector("#aemFormFrame").contentWindow.document;
          // change the form container, so that the other resource like client libs can be utilized by thank you message
          element = iframeDocument.querySelector(formSelector);
        } else {
          element = $(".aemformcontainer").find(formSelector)[0];
        }
        //honor thankYou message coming from server side.
        element.innerHTML = afSuccessPayload.thankYouContent;
        element.style.textAlign = "center";
        element.style.marginTop = "20px";
        element.setAttribute("data-iframe-height", "");

        guideBridge._guide.executeExpression("submitSuccess", afSuccessPayload);

        //CUSTOM CODE STARTS HERE
        var tymessage = iframeDocument.querySelector(".tyMessage");
        if (tymessage) {
          window.scrollTo(0, 0);
          tymessage.setAttribute("data-iframe-height", "");
        }
        //CUSTOM CODE ENDS HERE
      }
    },
    updateForm = function (guideBridge) {
      // This is an override of captcha mobile styling,
      // which fails when embedded in iframe of aem forms due to height issues on iframe
      const iframeForm =
        document.querySelector("#aemFormFrame").contentWindow.document;
      const fixMobileCaptchaHeight = () => {
        if (iframeForm.readyState === "complete") {
          const captchaContainer = iframeForm.querySelector(
            "body > div > div > iframe"
          )?.parentElement;
          if (captchaContainer) {
            captchaContainer.style.top = "auto";
            captchaContainer.style.bottom = "10vh";
          }
          window.clearTimeout(fixMobileCaptchaHeight);
        }
        window.setTimeout(fixMobileCaptchaHeight, 100);
      };

      if (window.innerWidth < 435) {
        fixMobileCaptchaHeight();
      }

      if (
        aemFormConfig.useIframe !== "false" &&
        aemFormConfig.height == "auto"
      ) {
        const targetOrigin = window.location.origin.replace(
          "http://",
          "https://"
        );

        iFrameResize(
          {
            autoResize: true,
            scrolling: true,
            checkOrigin: [targetOrigin],
            heightCalculationMethod:
              aemFormConfig.iFrameResizeHeightCalculationMethod ||
              "taggedElement",
          },
          "#aemFormFrame"
        );
      }
      if (aemFormConfig.height != "auto") {
        $("#aemFormFrame").css("height", aemFormConfig.height);
      }
      var submitConfig = {},
        renderConfig = {},
        formElement,
        inlineSubmitTypeWithoutIframe =
          aemFormConfig.useIframe === "false" &&
          aemFormConfig.submitType === "inline",
        pageRefreshSubmitTypeWithIframe =
          aemFormConfig.useIframe === "true" &&
          aemFormConfig.submitType === "pageRefresh";

      if (aemFormConfig.thankyouConfig === "page") {
        submitConfig.thankyouPage =
          aemFormConfig.thankyouPage === "" ? null : aemFormConfig.thankyouPage;
      }
      if (
        aemFormConfig.thankyouConfig === "message" ||
        inlineSubmitTypeWithoutIframe ||
        pageRefreshSubmitTypeWithIframe
      ) {
        submitConfig.useAjax = true;
        submitConfig.submitSuccessHandler = onSubmit;
      } else {
        if (
          aemFormConfig.submitType === "pageRefresh" &&
          aemFormConfig.useIframe !== "false"
        ) {
          formElement = document.createElement("form");
          formElement.setAttribute("method", "POST");
          formElement.setAttribute("enctype", "multipart/form-data");
          document.body.appendChild(formElement);
          submitConfig.form = formElement;
        }
      }
      submitConfig.aemFormComponentPath = aemFormConfig.aemFormComponentPath;
      renderConfig.enableFocusOnFirstField =
        aemFormConfig.enableFocusOnFirstField;
      guideBridge.registerConfig("submitConfig", submitConfig);
      guideBridge.registerConfig("renderConfig", renderConfig);
    },
    initAEMForm = function (evnt) {
      guideBridge = evnt.detail.guideBridge;
      updateForm(guideBridge);
      window.removeEventListener("bridgeInitializeStart", initAEMForm);
    },
    connectWithGuideBridge = function () {
      if (window.guideBridge) {
        guideBridge = window.guideBridge;
        updateForm(guideBridge);
      } else {
        window.addEventListener("bridgeInitializeStart", initAEMForm);
      }
    },
    initializeAEMForm = function (config) {
      aemFormConfig = config;
      if (config.form == "true") {
        connectWithGuideBridge();
      }
    },
    tmpEvent = document.createEvent("CustomEvent");

  tmpEvent.initCustomEvent("aemform-onscript-load", true, true, {
    formApp: {
      initializeAEMForm: initializeAEMForm,
    },
  });
  window.dispatchEvent(tmpEvent);
})();
