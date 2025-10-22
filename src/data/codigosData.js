// Datos centralizados de todos los códigos
export const codigosData = [
    {
        id: 1,
        titulo: 'Configuracion de movimiento de personaje en 2D',
        descripcion: 'La configuracion de un personaje para moverle es fundamental y lo principal muchos juegos, por eso aqui presentamos un codigo simple para configurar tu personaje.',
        categoria: 'Movimiento',
        fecha: 'Oct 12, 2025',
        autor: 'codeGodot',
        likes: 42,
        guardados: 15,
        codigo: `extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    if not is_on_floor():
        velocity.y += gravity * delta

    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    var direction = Input.get_axis("ui_left", "ui_right")
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)

    move_and_slide()`
    },
    {
        id: 2,
        titulo: 'Interacion personaje con puertas',
        descripcion: 'Sistema de interacción que permite al jugador abrir puertas al presionar una tecla. Incluye detección de colisiones y señales para comunicarse con otros objetos del juego.',
        categoria: 'Interacción',
        fecha: 'Sep 28, 2025',
        autor: 'Marcus Johnson',
        likes: 38,
        guardados: 12,
        codigo: `extends Area2D

signal door_opened

func _ready():
    connect("body_entered", self, "_on_body_entered")

func _on_body_entered(body):
    if body.is_in_group("player"):
        if Input.is_action_just_pressed("interact"):
            open_door()

func open_door():
    emit_signal("door_opened")
    print("¡Puerta abierta!")`
    },
    {
        id: 3,
        titulo: 'Ciclo día/noche',
        descripcion: 'Implementa un sistema dinámico de día y noche que cambia automáticamente la iluminación del juego. Perfecto para crear atmósferas inmersivas y mecánicas temporales.',
        categoria: 'Mundo',
        fecha: 'Oct 5, 2025',
        autor: 'Elena Wong',
        likes: 56,
        guardados: 23,
        codigo: `extends Node2D

var day_duration = 60.0  # duración del día en segundos
var time_of_day = 0.0

func _ready():
    set_process(true)

func _process(delta):
    time_of_day += delta / day_duration
    if time_of_day >= 1.0:
        time_of_day = 0.0
    
    update_lighting()

func update_lighting():
    var light_level = sin(time_of_day * PI)
    modulate.a = max(0.2, light_level)`
    },
    {
        id: 4,
        titulo: 'Generacion de enemigos basico',
        descripcion: 'Sistema automático de generación de enemigos con intervalos de tiempo configurables. Spawnnea enemigos en posiciones aleatorias para crear desafíos constantes al jugador.',
        categoria: 'Combate',
        fecha: 'Ene 16, 2025',
        autor: 'codeGodot',
        likes: 67,
        guardados: 31,
        codigo: `extends Node2D

var enemy_scene = preload("res://Enemy.tscn")
var spawn_timer = 0.0
var spawn_interval = 3.0

func _process(delta):
    spawn_timer += delta
    if spawn_timer >= spawn_interval:
        spawn_enemy()
        spawn_timer = 0.0

func spawn_enemy():
    var enemy = enemy_scene.instance()
    enemy.global_position = get_random_spawn_position()
    get_tree().current_scene.add_child(enemy)

func get_random_spawn_position():
    var x = randf() * 800
    var y = randf() * 600
    return Vector2(x, y)`
    },
    {
        id: 5,
        titulo: 'Zoom dinámico',
        descripcion: 'Control de cámara con zoom suave usando la rueda del mouse. Incluye límites configurables de zoom máximo y mínimo para mantener una experiencia de juego equilibrada.',
        categoria: 'Cámara',
        fecha: 'Mar 1, 2025',
        autor: 'codeGodot',
        likes: 44,
        guardados: 18,
        codigo: `extends Camera2D

var zoom_speed = 2.0
var min_zoom = 0.5
var max_zoom = 2.0

func _input(event):
    if event is InputEventMouseButton:
        if event.button_index == BUTTON_WHEEL_UP:
            zoom_in()
        elif event.button_index == BUTTON_WHEEL_DOWN:
            zoom_out()

func zoom_in():
    zoom = zoom * 1.1
    zoom = Vector2(min(zoom.x, max_zoom), min(zoom.y, max_zoom))

func zoom_out():
    zoom = zoom * 0.9
    zoom = Vector2(max(zoom.x, min_zoom), max(zoom.y, min_zoom))`
    },
    {
        id: 6,
        titulo: 'Musica segun interacciones',
        descripcion: 'Sistema de audio dinámico que cambia la música de fondo según las acciones del jugador. Incluye transiciones suaves entre diferentes pistas musicales.',
        categoria: 'Audio',
        fecha: 'Feb 12, 2025',
        autor: 'codeGodot',
        likes: 51,
        guardados: 22,
        codigo: `extends AudioStreamPlayer2D

var music_tracks = []
var current_track = 0

func _ready():
    music_tracks.append(preload("res://music/battle.ogg"))
    music_tracks.append(preload("res://music/peaceful.ogg"))

func change_music_on_interaction(interaction_type):
    match interaction_type:
        "battle":
            play_track(0)
        "peaceful":
            play_track(1)

func play_track(track_index):
    if track_index < music_tracks.size():
        stream = music_tracks[track_index]
        play()`
    },
    {
        id: 7,
        titulo: 'Menu de inicio',
        descripcion: 'Interfaz de menú principal completa con botones para iniciar juego, configuraciones y salir. Incluye navegación entre escenas y gestión de eventos de botones.',
        categoria: 'UI / Interfaz',
        fecha: 'Jul 30, 2025',
        autor: 'codeGodot',
        likes: 39,
        guardados: 16,
        codigo: `extends Control

onready var start_button = $VBox/StartButton
onready var options_button = $VBox/OptionsButton
onready var quit_button = $VBox/QuitButton

func _ready():
    start_button.connect("pressed", self, "_on_start_pressed")
    options_button.connect("pressed", self, "_on_options_pressed")
    quit_button.connect("pressed", self, "_on_quit_pressed")

func _on_start_pressed():
    get_tree().change_scene("res://Game.tscn")

func _on_options_pressed():
    get_tree().change_scene("res://Options.tscn")

func _on_quit_pressed():
    get_tree().quit()`
    }
]
