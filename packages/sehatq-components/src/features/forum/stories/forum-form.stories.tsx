import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  screen,
  within,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { URLS } from "@sehatq/constants";
import { ForumFormProps, ForumForm } from "..";
import { Box } from "../../../user-interfaces";
import {
  generateFakeForumCategories,
  generateFakeSubmitForumResponse,
  getForumCategories,
  submitForum,
} from "../msw-handlers";
import { getProfile } from "../../profile/msw-handlers";

export default {
  title: "Features / Forum / Forum Form",
  component: ForumForm,
  parameters: {
    msw: {
      handlers: [getProfile, getForumCategories, submitForum],
    },
  },
} as Meta;

type ForumFormStory = StoryObj<ForumFormProps>;

const overlayClassName = ".chakra-modal__content-container";
const invalidText =
  "3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet sesudah makan 3 x sehari 1 tablet";

// Open Modal Form
async function openModal(modalButton: HTMLElement) {
  userEvent.click(modalButton);
  const modal = await screen.findByRole("dialog");
  const modalScreen = within(modal);
  userEvent.clear(modalScreen.getByPlaceholderText("Judul"));
  userEvent.clear(modalScreen.getByPlaceholderText("Pertanyaan"));
  return { modal, screen: modalScreen };
}

// Close Modal Form
async function closeModal(modal: HTMLElement, isMobile?: boolean) {
  if (isMobile) {
    const modalOverlay = document.querySelector(overlayClassName);
    if (modalOverlay) {
      userEvent.click(modalOverlay);
    }
  } else {
    const closeButton = screen.getByLabelText("Close");
    expect(closeButton).toBeInTheDocument();
    userEvent.click(closeButton);
  }
  await waitForElementToBeRemoved(modal);
}

// Validate required field
async function validateField(modalButton: HTMLElement, isMobile?: boolean) {
  /* 
    Case 1 
    Submit without filling in the data
  */
  const { modal, screen: modalScreen } = await openModal(modalButton);
  userEvent.click(
    modalScreen.getByRole("button", {
      name: "Kirim",
    })
  );
  expect(modalScreen.getByText("Judul wajib diisi")).toBeInTheDocument();
  expect(modalScreen.getByText("Kategori wajib diisi")).toBeInTheDocument();
  expect(modalScreen.getByText("Pertanyaan wajib diisi")).toBeInTheDocument();

  /*
    Case 2 
    Validate minimum character
  */
  userEvent.type(modalScreen.getByPlaceholderText("Judul"), "Test");
  userEvent.type(modalScreen.getByPlaceholderText("Pertanyaan"), "Per");
  await waitFor(() =>
    expect(
      modalScreen.getAllByText("Minimum 5 karakter").length
    ).toBeGreaterThan(1)
  );

  /*
    Case 3
    Validate maximum character
  */

  userEvent.type(modalScreen.getByPlaceholderText("Judul"), invalidText);
  expect(modalScreen.getByText("Maksimum 100 karakter")).toBeInTheDocument();

  userEvent.type(modalScreen.getByPlaceholderText("Pertanyaan"), invalidText);
  expect(modalScreen.getByText("Maksimum 500 karakter")).toBeInTheDocument();

  await closeModal(modal, isMobile);
}

// Submit form
async function submitForm(modalButton: HTMLElement) {
  const { data: forumCategories } = generateFakeForumCategories();
  const { screen: modalSubmitScreen } = await openModal(modalButton);

  // Input title
  const title = "Test Input Forum";
  userEvent.type(modalSubmitScreen.getByPlaceholderText("Judul"), title);

  // Input question
  const question = "Pertanya mendasar";
  userEvent.type(
    modalSubmitScreen.getByPlaceholderText("Pertanyaan"),
    question
  );

  // Select category option
  const categoryInput = modalSubmitScreen.getByRole("button", {
    name: "Kategori",
  });
  expect(categoryInput).toBeInTheDocument();
  userEvent.click(categoryInput);
  const selectCategory = screen.getByText(forumCategories[0].name);
  userEvent.click(selectCategory);

  // Submit Form
  userEvent.click(modalSubmitScreen.getByText("Kirim"));
  const {
    meta: { message },
  } = generateFakeSubmitForumResponse({
    title,
    categoryId: forumCategories[0].id,
    question,
  });
  expect(await screen.findByText(message)).toBeInTheDocument();

  // Expect redirect to thank you page
  await waitFor(() =>
    expect(
      modalSubmitScreen.getByText("Pertanyaan Terkirim")
    ).toBeInTheDocument()
  );

  return modalSubmitScreen;
}

function playUnitTest(isMobile?: boolean) {
  return async () => {
    // wait until generate button
    const textButton = isMobile ? "Tanya" : "Buat Pertanyaan Baru";
    const modalButton = await screen.findByRole("button", {
      name: textButton,
    });

    // validate input
    await validateField(modalButton, isMobile);

    // submit form
    const modalSubmitScreen = await submitForm(modalButton);

    // Expect redirect to thank you page
    const btnConfirm = modalSubmitScreen.getByRole("link", {
      name: "Kembali ke Forum",
    });
    expect(btnConfirm).toBeInTheDocument();
    expect(btnConfirm.getAttribute("href")).toEqual(URLS.FORUMS);

    // finish
    const modalOverlay = document.querySelector(overlayClassName);
    if (modalOverlay) {
      userEvent.click(modalOverlay);
    }
  };
}

export const Desktop: ForumFormStory = {
  render: (args) => (
    <Box width="760px">
      <ForumForm {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
  play: playUnitTest(),
};

export const Mobile: ForumFormStory = {
  render: (args) => (
    <Box width="328px">
      <ForumForm {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
  play: playUnitTest(true),
};

const bannerForumArgs = {
  disableNavigateBack: true,
  textButton: "Kirim",
  variant: "solid" as
    | "link"
    | "tab"
    | "solid"
    | "outline"
    | "ghost"
    | "unstyled"
    | "fit"
    | "chip"
    | undefined,
  background: "main.500",
  widthButton: "full",
  isBannerQuestionInput: true,
};

function inputQuestionBanner(modalButton: HTMLElement) {
  userEvent.click(modalButton);
  userEvent.clear(screen.getByPlaceholderText("Pertanyaan"));
  expect(screen.getByText("Pertanyaan wajib diisi")).toBeInTheDocument();

  // input question banner
  userEvent.type(screen.getByPlaceholderText("Pertanyaan"), "test");
  expect(screen.getByText("Minimum 5 karakter")).toBeInTheDocument();

  userEvent.type(screen.getByPlaceholderText("Pertanyaan"), invalidText);
  expect(screen.getByText("Maksimum 500 karakter")).toBeInTheDocument();
  userEvent.clear(screen.getByPlaceholderText("Pertanyaan"));
  userEvent.type(
    screen.getByPlaceholderText("Pertanyaan"),
    "Isi pertanyaan melalui banner"
  );
}

function playTestBanner(isMobile?: boolean) {
  return async () => {
    // wait until generate button
    const textButton = isMobile ? "Tulis Pertanyaanmu" : "Kirim";
    const modalButton = await screen.findByRole("button", {
      name: textButton,
    });

    if (!isMobile) {
      inputQuestionBanner(modalButton);
    }

    // validate input
    await validateField(modalButton, isMobile);

    if (!isMobile) {
      inputQuestionBanner(modalButton);
    }

    // submit form
    const modalSubmitScreen = await submitForm(modalButton);

    // Expect redirect to thank you page
    const btnConfirm = modalSubmitScreen.getByRole("button", {
      name: "Kembali ke Forum",
    });
    expect(btnConfirm).toBeInTheDocument();

    // finish
    const modalOverlay = document.querySelector(overlayClassName);
    if (modalOverlay) {
      userEvent.click(modalOverlay);
    }
  };
}

export const BannerDesktop: ForumFormStory = {
  render: (args) => (
    <Box width="760px">
      <ForumForm {...args} isMobile={false} />
    </Box>
  ),
  args: {
    ...bannerForumArgs,
  },
  play: playTestBanner(),
};

export const BannerMobile: ForumFormStory = {
  render: (args) => (
    <Box width="328px">
      <ForumForm {...args} isMobile />
    </Box>
  ),
  args: {
    ...bannerForumArgs,
    textButton: "Tulis Pertanyaanmu",
    heightButton: "40px",
    borderRadius: "base",
  },
  play: playTestBanner(true),
};
