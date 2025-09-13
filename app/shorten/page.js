"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  FileLinkIcon,
  LinkSquare02Icon,
  TaskDone01Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  AiMagicIcon,
  Alert02Icon,
  Cancel01Icon,
  Cancel02Icon,
} from "@hugeicons/core-free-icons";

const Page = () => {
  const [url, setUrl] = useState("");
  const [shortTerm, setShortTerm] = useState("");
  const [generated, setGenerated] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const generateUrl = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shortTerm: shortTerm,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortTerm}`);
          setUrl("");
          setShortTerm("");
          setShowGenerateModal(true);
          setTimeout(() => setShowGenerateModal(false), 3000);
        } else {
          setErrorMessage(
            "This alias is already taken. Please choose another one."
          );
          setShowErrorModal(true);
          setTimeout(() => setShowErrorModal(false), 4000);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Something went wrong. Please try again.");
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(false), 4000);
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
    setShowCopyModal(true);
    setTimeout(() => setShowCopyModal(false), 3000);
  };

  const handleClick = () => {
    if (url.length < 10 || shortTerm.length < 3) {
      return;
    }
    generateUrl();
  };

  return (
    <div className="w-full min-h-[90vh] py-10 flex flex-col items-center gap-5">
      <div className="generate-box border-2 border-[#bf6aff]  rounded-2xl w-1/2 max-sm:w-[90%] h-1/2 px-5 py-10 flex flex-col gap-8 items-center">
        <span className="tittle text-4xl max-sm:text-3xl font-bold">
          Generate Short URLs
        </span>
        <input
          className="poppins w-3/4 max-sm:w-[90%] px-3 py-1.5 rounded-lg border-2 outline-none border-neutral-800"
          type="text"
          placeholder="Enter url"
          name="url"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <input
          className="poppins w-3/4 max-sm:w-[90%] px-3 py-1.5 rounded-lg border-2 outline-none border-neutral-800"
          type="text"
          placeholder="Enter alias"
          name="shortTerm"
          onChange={(e) => {
            setShortTerm(e.target.value);
          }}
          value={shortTerm}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <button
          className={`btn hover:cursor-pointer ${
            url.length < 10 || shortTerm.length < 3 ? "disabled" : ""
          } disabled:cursor-not-allowed`}
          onClick={handleClick}
        >
          <span className="icon">
            <HugeiconsIcon icon={Link01Icon} />
          </span>
          <span className="btn-text">Generate</span>
        </button>
      </div>
      {generated && (
        <div className="generate-box2 rounded-2xl w-1/2 max-sm:w-[90%] h-1/2 px-5 max-sm:px-2 py-8 flex flex-col gap-5 items-center">
          <>
            <span className="title text-2xl font-bold">Generated URL:</span>
            <div className="w-3/4 max-sm:w-[90%] px-3 py-1.5 rounded-lg border-2 outline-none border-neutral-800 flex justify-center items-center gap-8 max-sm:gap-2">
              <HugeiconsIcon
                icon={LinkSquare02Icon}
                onClick={() => window.open(generated, "_blank")}
                className="hover:cursor-pointer hover:scale-110 active:scale-50 transition-all ease-in-out duration-300"
                strokeWidth={2}
              />
              <a
                href={generated}
                className="text-[#187bff] poppins font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {generated.split("//").pop()}
              </a>
              <HugeiconsIcon
                icon={showSuccess ? TaskDone01Icon : FileLinkIcon}
                onClick={copyToClipboard}
                className={`hover:cursor-pointer transition-all duration-300 ${
                  showSuccess ? "font-bold scale-110" : ""
                }`}
                strokeWidth={2}
              />
            </div>
          </>
        </div>
      )}
      <div
        className={`fixed bottom-6 right-6 max-sm:left-1/2  max-sm:right-auto z-50 transition-all duration-700 ease-out ${
          showGenerateModal
            ? "translate-x-0 max-sm:-translate-x-1/2 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 px-6 py-5 rounded-2xl shadow-2xl backdrop-blur-sm flex items-center gap-4 min-w-[320px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 animate-pulse"></div>

          <div className="relative z-10 bg-green-100 dark:bg-green-800 p-3 rounded-full animate-pulse">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              className="text-white text-2xl"
              strokeWidth={2}
            />
          </div>

          <div className="relative z-10 flex-1">
            <div className="font-bold text-xl poppins text-gray-800 dark:text-white mb-1 flex items-center gap-2">
              <HugeiconsIcon icon={AiMagicIcon} /> Success !
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Your short link is ready to use
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-6 right-6 max-sm:left-1/2  max-sm:right-auto z-50 transition-all duration-700 ease-out ${
          showCopyModal
            ? "translate-x-0 max-sm:-translate-x-1/2 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 px-6 py-5 rounded-2xl shadow-2xl backdrop-blur-sm flex items-center gap-4 min-w-[320px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 animate-pulse"></div>

          <div className="relative z-10 bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
            <HugeiconsIcon
              icon={Copy01Icon}
              className="text-white text-2xl animate-pulse"
              strokeWidth={2}
            />
          </div>

          <div className="relative z-10 flex-1">
            <div className="font-bold text-xl poppins text-gray-800 dark:text-white mb-1 flex items-center gap-2">
              <HugeiconsIcon icon={Link01Icon} /> Copied !
              <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full animate-pulse">
                Ctrl+V
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Link is copied to your clipboard !
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed bottom-6 right-6 max-sm:left-1/2 max-sm:right-auto z-50 transition-all duration-700 ease-out ${
          showErrorModal
            ? "translate-x-0 max-sm:-translate-x-1/2 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 px-6 py-5 rounded-2xl shadow-2xl backdrop-blur-sm flex items-center gap-4 min-w-[320px] max-w-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 animate-pulse"></div>

          <div className="relative z-10 bg-red-100 dark:bg-red-800 p-3 rounded-full">
            <HugeiconsIcon
              icon={Alert02Icon}
              className="text-red-600 dark:text-white text-2xl"
              strokeWidth={2}
            />
          </div>

          <div className="relative z-10 flex-1">
            <div className="font-bold text-xl poppins text-gray-800 dark:text-white mb-1 flex items-center gap-2">
              <HugeiconsIcon icon={Cancel02Icon} className="text-red-500" />{" "}
              Error !
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {errorMessage}
            </div>
          </div>

          <button
            onClick={() => setShowErrorModal(false)}
            className="relative z-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              className="text-lg"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
