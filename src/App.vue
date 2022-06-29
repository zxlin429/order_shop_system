<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
html {
    font-size: 1.4vw;
}
#app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
