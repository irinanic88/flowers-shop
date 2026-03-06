import { Stack, Typography } from "@mui/material";
import React from "react";

import IncrementDecrementButtons from "@/src/components/common/IncrementDecrementButtons";
import { PanelCard, Row } from "@/src/styledComponents";
import { CartItemCardProps } from "@/src/types/propsTypes.ts";

export function CartItemCard({ item, updateItemQuantity }: CartItemCardProps) {
  return (
    <PanelCard>
      <Stack spacing={3}>
        <Row>
          <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>

          <IncrementDecrementButtons
            inStock={item.available}
            quantity={item.quantity}
            onChange={(q) =>
              updateItemQuantity(
                {
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  available: item.available,
                  pots_count: item.pots_count,
                },
                q,
              )
            }
          />
        </Row>

        <Row mt={1}>
          <Typography variant="body1">
            Total : {item.quantity} Cajas x {item.pots_count} Uds ={" "}
            {item.quantity * item.pots_count} Uds
          </Typography>

          <Typography color="primary">
            € {(item.price * item.quantity * item.pots_count).toFixed(2)}
          </Typography>
        </Row>
      </Stack>
    </PanelCard>
  );
}
