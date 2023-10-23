import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleProp, View, ViewStyle } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { z } from "zod";

const style: StyleProp<ViewStyle> = {
  width: "100%",
  paddingLeft: 10,
  paddingRight: 10,
  gap: 6,
};

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Informe um e-mail" })
    .email({ message: "Informe e-mail válido" }),
  password: z.string().min(4, { message: "Informe ao menos 4 caracteres" }),
});

type FormType = z.infer<typeof FormSchema>;

export function Main() {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });
  const [passIsVisible, setPassIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(data: FormType) {
    setIsLoading((state) => !state);
    console.log(data);
    setTimeout(() => {
      setIsLoading((state) => !state);
    }, 4000);
  }

  return (
    <View style={style}>
      <Controller
        name="email"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextInput
            label="E-mail"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={Boolean(error?.message)}
            right={<TextInput.Icon icon="email" />}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <TextInput
            label="Senha"
            mode="outlined"
            secureTextEntry={passIsVisible}
            error={Boolean(error?.message)}
            right={
              <TextInput.Icon
                onPress={() => setPassIsVisible((state) => !state)}
                icon={passIsVisible ? "eye-off" : "eye"}
              />
            }
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Button
        mode="contained"
        uppercase
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        style={{
          borderRadius: 5,
          backgroundColor: "#2d6a4f",
          marginTop: 15,
        }}
        textColor="#f4f4f4"
      >
        Entrar
      </Button>
    </View>
  );
}
