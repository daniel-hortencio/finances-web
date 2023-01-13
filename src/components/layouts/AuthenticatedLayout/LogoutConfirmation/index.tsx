import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { userService } from "../../../../services/User";
import { logoutUser } from "../../../../store";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

export const LogoutConfirmation = ({ onSuccess, onClose }: Props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogout(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    userService
      .logout()
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        onSuccess();
        onClose();
      });
  }

  return (
    <form onSubmit={handleLogout}>
      <Grid templateColumns="repeat(2, 1fr)" gap={2} width="min-content">
        <GridItem>
          <Button
            size="md"
            type="button"
            onClick={onClose}
            isLoading={isLoading}
          >
            Cancel
          </Button>
        </GridItem>
        <GridItem>
          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            isLoading={isLoading}
          >
            Logout
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
};
