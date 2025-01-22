import React from "react"
import styles from "./StepWrapper.module.scss"
import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material"

interface StepWrapperProps {
  activeStep: number
  children: React.ReactNode
}

const steps = ["Информация о треке", "Загрузите обложку", "Загрузите сам трек"]
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step} completed={activeStep > index}>
            <StepLabel>
              <span className={styles.stepLabel}>{step}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container className={styles.WrapperGrid}>
        <Card className={styles.CardInGrid}>{children}</Card>
      </Grid>
    </Container>
  )
}

export default StepWrapper
