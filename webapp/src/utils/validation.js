import * as Yup from "yup";

export const equalTo = (ref: any, msg: any) => {
  return Yup.mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg || `${ref.path} must be the same as ${ref.reference}`,
    params: {
      reference: ref.path
    },
    test: function(value: any) {
      return value === this.resolve(ref);
    }
  });
};

Yup.addMethod(Yup.string, "equalTo", equalTo);
