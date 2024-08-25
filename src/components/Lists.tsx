import {
  Stack,
  SimpleGrid,
  GridItem,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const Lists = () => {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <SimpleGrid
        as="form"
        w={{ base: "full", md: 7 / 12 }}
        columns={{ base: 1, lg: 6 }}
        spacing={3}
        pt={1}
        mx="auto"
        mb={8}
      >
        <GridItem colSpan={{ base: "auto", lg: 2 }}> Proof of Personhood
          <Stack pl={6} mt={1} spacing={1}>
            <CheckboxGroup
              defaultValue={["worldid", "brightid"]}
              onChange={(selected) => console.log(selected)}
            >
              <Checkbox value="worldid">WorldCoin ID</Checkbox>
              <Checkbox value="gitcoin">Gitcoin Passport</Checkbox>
              <Checkbox value="babt">Binance BABT</Checkbox>
              <Checkbox value="coinbaseid">Coinbase KYC</Checkbox>

            </CheckboxGroup>
          </Stack>
        </GridItem> 
        <GridItem colSpan={{ base: "auto", lg: 2 }}> Blockchain & Crypto Networks
          <Stack pl={6} mt={1} spacing={1}>
            <Checkbox >5 NFT</Checkbox>
            <Checkbox defaultChecked>100 transactions</Checkbox>
            <Checkbox >0.25 ETH on gas</Checkbox>
            <Checkbox defaultChecked>at least 1 Snapshot</Checkbox>
            <Checkbox >1000 days old transactions</Checkbox>
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: "auto", lg: 2 }}>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) =>
              setCheckedItems([
                e.target.checked,
                e.target.checked,
                e.target.checked,
                e.target.checked,
                e.target.checked,
              ])
            }
          >
            My Circel
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            <Checkbox
              isChecked={checkedItems[0]}
              onChange={(e) =>
                setCheckedItems([e.target.checked, checkedItems[1]])
              }
            >
              CryptoPunks
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              BAYC
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[2]}
              onChange={(e) =>
                setCheckedItems([checkedItems[1], e.target.checked])
              }
            >
              Nouns
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[3]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              ENS
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[4]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              Lens
            </Checkbox>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </>
  );
};
