import React from "react";

import { Link } from "@reach/router";
import {
    DetailsList,
    SelectionMode,
    IconButton
} from "office-ui-fabric-react";

import Container from "../../components/container";
import Tooltip from "../../components/tooltip";

const columnsDefinitions = [
    {
        key: "owner",
        fieldName: "owner",
        name: "Ultimo Possessore",
    },
    {
        key: "serial",
        fieldName: "serial",
        name: "Seriale",
    },
    {
        key: "dateFrom",
        fieldName: "dateFrom",
        name: "Acquisto",
    },
    {
        key: "dateUpcycle",
        fieldName: "dateTo",
        name: "Upcycle",
    },
    {
        key: "receiver",
        fieldName: "receiver",
        name: "Associazione",
    }
];

const actionsColumns = [
    {
        key: "actions",
        name: "Modifica",
        minWidth: 80,
        onRender: () => (
            <>
                <Tooltip
                    content={"Note"}
                    cursor={"pointer"}
                >
                    <IconButton
                        iconProps={{ iconName: "More" }}
                    />
                </Tooltip>

                <Tooltip content="Modifica" cursor={"pointer"}>
                    <Link to={`/app/upcycle/`}>
                        <IconButton iconProps={{ iconName: "EditNote" }} />
                    </Link>
                </Tooltip>
            </>
        ),
    },
];

const Upcycled = () => {
    return (
        <Container>
            <DetailsList
                selectionMode={SelectionMode.none}
                columns={[...columnsDefinitions, ...actionsColumns]}
                items={"Upcycled"}
            />
        </Container>
    );
};

export default Upcycled;
