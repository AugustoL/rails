import React, { useCallback, useState, useEffect } from "react";
import { Flex, Box } from "reflexbox";
import { FormattedMessage } from "react-intl";
import { Button } from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/loopring";
import darkLogo from "../../images/logo-dark.svg";
import lightLogo from "../../images/logo-light.svg";
import { LoginIllustration } from "./styled";
import { BottomUpContainer } from "../../components/bottom-up-container";
import { initializeWeb3 } from "../../actions/web3";
import { RegistrationFlow } from "./registration-flow";
import { selectedTheme } from "../app";

const Auth = () => {
    const dispatch = useDispatch();
    const { web3Instance } = useSelector((state) => ({
        web3Instance: state.web3.instance,
    }));

    const [loggingIn, setLoggingIn] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [open, setOpen] = useState(false);

    const handleLoginClick = useCallback(() => {
        if (!web3Instance) {
            dispatch(initializeWeb3());
        }
        setRegistering(false);
        setLoggingIn(true);
    }, [dispatch, web3Instance]);

    const handleRegisterClick = useCallback(() => {
        if (!web3Instance) {
            dispatch(initializeWeb3());
        }
        setLoggingIn(false);
        setRegistering(true);
    }, [dispatch, web3Instance]);

    useEffect(() => {
        setOpen(web3Instance && (loggingIn || registering));
    }, [loggingIn, registering, web3Instance]);

    const handleLoginProceed = useCallback(() => {
        dispatch(login(web3Instance));
    }, [dispatch, web3Instance]);

    const handleClose = useCallback(() => {
        setLoggingIn(false);
        setRegistering(false);
    }, []);

    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                width="100%"
                height="100%"
            >
                <Box mb="40px" width={["40%", "30%", "20%", "10%"]}>
                    <LoginIllustration
                        src={
                            selectedTheme.type === "light"
                                ? darkLogo
                                : lightLogo
                        }
                    />
                </Box>
                <Box
                    mb="32px"
                    width={["80%", "70%", "60%", "30%", "20%"]}
                    textAlign="center"
                >
                    <FormattedMessage id="auth.summary" />
                </Box>
                <Flex>
                    <Box mr="24px">
                        <Button onClick={handleLoginClick}>
                            <FormattedMessage id="auth.login.button" />
                        </Button>
                    </Box>
                    <Box>
                        <Button secondary onClick={handleRegisterClick}>
                            <FormattedMessage id="auth.register.button" />
                        </Button>
                    </Box>
                </Flex>
            </Flex>
            <BottomUpContainer open={open && loggingIn} onClose={handleClose}>
                <Flex width="100%" flexDirection="column" alignItems="center">
                    <Box mb="24px">
                        <FormattedMessage id="auth.login.proceed.message" />
                    </Box>
                    <Box>
                        <Button onClick={handleLoginProceed}>
                            <FormattedMessage id="auth.login.proceed.button.title" />
                        </Button>
                    </Box>
                </Flex>
            </BottomUpContainer>
            <BottomUpContainer open={open && registering} onClose={handleClose}>
                <RegistrationFlow open={open && registering} />
            </BottomUpContainer>
        </>
    );
};

export default Auth;
