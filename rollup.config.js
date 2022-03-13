import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import dotenv from "rollup-plugin-dotenv";
import image from "@rollup/plugin-image";
import babel from "@rollup/plugin-babel";
import scss from "rollup-plugin-scss";

const target = process.env.APP_DEV ? false : true;

export default {
  input: "src/index.tsx",
  output: {
    file: "public/app.js",
  },
  plugins: [
    resolve({
      //extensions: [".js"],
      browser: true,
    }),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: ["node_modules/**"],
      plugins: [
        ["@babel/preset-env"],
        [
          "@babel/plugin-transform-react-jsx",
          { "pragma": "h", "pragmaFrag": "fragment" }
        ]
      ]
    }),
    scss(target && { outputStyle: "compressed" }),
    image(),
    dotenv(),
    target && terser(),
  ],
};
