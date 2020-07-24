import React, { useState } from "react";

import {
    DetailsList,
    SelectionMode,
    IconButton
} from "office-ui-fabric-react";

import Container from "../../components/container";
import Tooltip from "../../components/tooltip";
import UpcycleDialog from "../../components/upcycle-dialog";

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

const Upcycled = () => {
    const [upcycle, setUpcycle] = useState({
        show: false,
    });

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
                        <IconButton iconProps={{ iconName: "EditNote" }} onClick={() => setUpcycle({ show: true })} />
                    </Tooltip>
                </>
            ),
        },
    ];

    return (
        <Container>
            <UpcycleDialog
                hidden={!upcycle.show}
                onDismiss={() => setUpcycle({ show: false })}
            />
            <DetailsList
                selectionMode={SelectionMode.none}
                columns={[...columnsDefinitions, ...actionsColumns]}
                items={"Upcycled"}
            />
        </Container>
    );
};

export default Upcycled;
