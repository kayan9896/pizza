#include <gtk/gtk.h>

// Function to switch from one window to another
void switch_windows(GtkWidget *current_window, GtkWidget *new_window) {
    // Hide the current window
    gtk_widget_hide(current_window);

    // Ensure all widgets in the new window are realized
    gtk_widget_show_all(new_window);

    // Present the new window
    gtk_window_present(GTK_WINDOW(new_window));
}

int main(int argc, char *argv[]) {
    gtk_init(&argc, &argv);

    // Create two example windows
    GtkWidget *window1 = gtk_window_new(GTK_WINDOW_TOPLEVEL);
    GtkWidget *window2 = gtk_window_new(GTK_WINDOW_TOPLEVEL);

    // Set up window1
    gtk_window_set_title(GTK_WINDOW(window1), "Window 1");
    gtk_window_set_default_size(GTK_WINDOW(window1), 200, 200);
    g_signal_connect(window1, "destroy", G_CALLBACK(gtk_main_quit), NULL);

    // Set up window2
    gtk_window_set_title(GTK_WINDOW(window2), "Window 2");
    gtk_window_set_default_size(GTK_WINDOW(window2), 200, 200);
    g_signal_connect(window2, "destroy", G_CALLBACK(gtk_main_quit), NULL);

    // Create a button to switch to window2
    GtkWidget *button = gtk_button_new_with_label("Switch to Window 2");
    g_signal_connect(button, "clicked", G_CALLBACK(switch_windows), window2);
    gtk_container_add(GTK_CONTAINER(window1), button);

    // Show window1
    gtk_widget_show_all(window1);

    gtk_main();
    return 0;
}