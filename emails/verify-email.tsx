import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

const VerificationEmail = ({ url, email }: { url: string; email: string }) => {
  return (
    <Html>
      <Tailwind>
        <Head>
          <title>Verify Your Email Address</title>
          <Preview>
            Verify your email address to complete your registration
          </Preview>
        </Head>
        <Body className="bg-[#f6f9fc] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[20px] max-w-[600px]">
            <Heading className="text-[24px] font-bold text-center text-[#333] my-[30px] mx-0">
              Verify Your Email Address
            </Heading>

            <Text className="text-[16px] leading-[24px] text-[#555] mb-[24px]">
              Thank you for signing up! To complete your registration and access
              your account, please verify your email address by clicking the
              button below.
            </Text>

            <Section className="text-center my-[32px]">
              <Button
                className="bg-[#0070f3] text-white rounded-[4px] py-[12px] px-[24px] text-[16px] font-medium no-underline text-center box-border"
                href={url}
              >
                Verify Email Address
              </Button>
            </Section>

            <Text className="text-[14px] leading-[24px] text-[#555] mb-[24px]">
              If you didn&apos;t create an account, you can safely ignore this
              email.
            </Text>

            <Text className="text-[14px] leading-[24px] text-[#555]">
              If the button doesn&apos;t work, copy and paste this link into
              your browser:
            </Text>

            <Text className="text-[14px] text-[#0070f3] mb-[32px]">{url}</Text>

            <Hr className="border-[#e6ebf1] border-solid my-[20px]" />

            <Text className="text-[12px] text-[#8898aa] text-center m-0">
              This email was sent to {email}
            </Text>

            <Text className="text-[12px] text-[#8898aa] text-center m-0">
              © 2025 Your Company Name, All Rights Reserved
            </Text>

            <Text className="text-[12px] text-[#8898aa] text-center m-0">
              123 Main St, Your City, Country
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
