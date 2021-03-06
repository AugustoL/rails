import React from "react";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";
import { FormattedMessage } from "react-intl";
import { Button } from "../../../../../components/button";

export const DepositConfirmation = ({ asset, transactionHash }) => (
    <Flex
        width="100%"
        height="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
    >
        <Box mb="24px" width="100%">
            <FormattedMessage
                id="deposit.confirmation.message"
                values={{ tokenSymbol: asset.symbol }}
            />
        </Box>
        <Box>
            <Button
                link
                external
                href={`https://etherscan.io/tx/${transactionHash}`}
            >
                <FormattedMessage id="deposit.confirmation.button.title" />
            </Button>
        </Box>
    </Flex>
);

DepositConfirmation.propTypes = {
    asset: PropTypes.object.isRequired,
    transactionHash: PropTypes.string,
};
