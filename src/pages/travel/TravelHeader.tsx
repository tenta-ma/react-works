import { Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * 旅行情報ヘッダー
 *
 * @param activeIndex アクティブ表示をするStepのindex、先頭の場合0を指定
 */
export const TravelHeader: React.FC<{
  activeIndex: number;
}> = ({ activeIndex }): JSX.Element => {
  const { t } = useTranslation("translation", { keyPrefix: "travel.header" });

  return (
    <>
      <Stack p={2} direction={"column"}>
        <Typography fontWeight={"bold"} color="primary" data-testid="title">
          {t("title")}
        </Typography>
      </Stack>
      <Stack pb={2}>
        <Stepper activeStep={activeIndex}>
          <Step>
            <StepLabel />
          </Step>
          <Step>
            <StepLabel />
          </Step>
          <Step>
            <StepLabel />
          </Step>
          <Step>
            <StepLabel />
          </Step>
          <Step>
            <StepLabel />
          </Step>
          <Step>
            <StepLabel />
          </Step>
        </Stepper>
      </Stack>
    </>
  );
};
